'use client';

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { CodeIcon, MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { connect } from "http2";
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(process.env.API_KEY||"");
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

interface Message {
    role: "user" | "bot";  // Specify the roles
    content: string; //content of the message
}

const ConversationPage = () => {

    const proModal = useProModal();
    const router = useRouter();

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const userMessage:Message = {
                role: "user",
                content: values.prompt,
            }

            const newMessages = [...messages,userMessage];

            const response = await axios.post("/api/code", {
                prompt: values.prompt,
            });

            console.log('api response :',response.data)

            const botMessageContent = response.data.response.candidates[0]?.content?.parts[0]?.text;

            const cleanBotMessageContent = botMessageContent.replace(/\*\*/g, "").trim();

            const botMessage:Message = {
                role:"bot",
                content: cleanBotMessageContent|| "No response available",
            }

            setMessages([...newMessages,botMessage])

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("something went wrong");
            }
        } finally {
            router.refresh();
        }
    }

    console.log('message array :',messages);

    return (
        <div>
            <Heading
                title="conversation Page"
                description="chat with latest Conversation Model."
                icon={MessageSquareIcon}
                iconColor="text-purple-500"
                bgColor="bg-purple-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg
                        border
                        w-full
                        p-4
                        md:px-6 
                        focus-within:shadow-md
                        grid
                        grid-cols-12
                        gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="e.x. what is your purpose ?"
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    {messages.length === 0 && !isLoading && (
                        <Empty label="no conversation started" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message,index) => (
                            <div key={index}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>

                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;