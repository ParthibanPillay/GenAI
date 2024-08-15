"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
        {
            name: "Jordan Lee",
            avatar: "J",
            title: "Project Manager",
            description: "Experienced in overseeing complex projects and ensuring timely delivery."
        },
        {
            name: "Emily Carter",
            avatar: "E",
            title: "UX Designer",
            description: "Passionate about creating intuitive and engaging user experiences for web and mobile applications."
        },
        {
            name: "Liam Patel",
            avatar: "L",
            title: "Data Scientist",
            description: "Specializes in analyzing large datasets to uncover insights and drive strategic decision-making."
        },
        {
            name: "Ava Gomez",
            avatar: "A",
            title: "Content Writer",
            description: "Skilled in crafting compelling content that captures attention and drives engagement across various platforms."
        }
    ]


const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-20">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-sm text-zinc-400">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 p-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default LandingContent;