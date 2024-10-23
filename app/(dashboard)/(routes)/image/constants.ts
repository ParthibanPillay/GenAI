import * as z from "zod";

export const formSchema = z.object({
    prompt : z.string().min(1,{
        message : " Image prompt is required"
    }),
    amount : z.string().min(1),
    resolution : z.string().min(1)
})

export const amountOptions = [
    {
        value : "1",
        label : "1 photo"
    },
    {
        value : "2",
        label : "2 photos"
    },
    {
        value : "3",
        label : "3 photos"
    },
    {
        value : "4",
        label : "4 photos"
    },
]

export const resolutionOptions = [
    {
        value : "512x512",
        label : "512x512",
    }
]