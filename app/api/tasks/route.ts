import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/utils/connect";

export async function POST(req: Request){
    try{
        const {userId} = auth();
        if(!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const {title, description, date, completed, important, xpPoints, totalXpPoints, ftitle, fdescription, category} = await req.json();
        // Validate the data
        if (!title || !description || !date || !xpPoints || !category || !ftitle || !fdescription) {
            return NextResponse.json({ 
                error: "Missing required fields", 
                status: 400 
            });
        }

        if(title.length < 3){
            return NextResponse.json({ 
                error: "Title should be at least 3 characters long", 
                status: 400 
            });
        } 

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                xpPoints,
                userId,
                totalXpPoints: 0,
                ftitle,
                fdescription,
                category,
            },
        });

        console.log("TASK CREATED: ", task);

        return NextResponse.json(task);
    } catch(error) {
        console.log('ERROR CREATING TASKS: ', error);
        return NextResponse.json({ error: "error creating task", status: 500 });
    }
}

export async function GET(req: Request){
    try{

        const tasks = await prisma.task.findMany();

        console.log("TASKS: ", tasks);
        return NextResponse.json(tasks);

    } catch(error) {
        console.log('ERROR GETTING TASKS: ', error);
        return NextResponse.json({ error: "error getting task", status: 500 });
    }
}

export async function PUT(req: Request){
    
    try{
        const { userId } = auth();
        const { isCompleted, id } = await req.json();

        if (!userId){
            return NextResponse.json({ error: "Unauthorized" ,status: 401});
        }

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            },
        });

        return NextResponse.json(task);
    } catch(error) {
        console.log('ERROR UPDATING TASKS: ', error);
        return NextResponse.json({ error: "error updating task", status: 500 });
    }
}