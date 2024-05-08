import type { MetaFunction } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import prisma from "~/lib/prisma";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }) {
  const formData = await request.formData();
  if (request.method === "POST") {
    const message = formData.get("message");

    await prisma.message.create({
      data: {
        message: message
      }
    });

    return json({ message: "Successfully sent message" })
  } else if (request.method === "PATCH") {
    const messageId = formData.get("messageId");
    const message = formData.get("message");

    await prisma.message.update({
      where: {
        id: messageId
      },
      data: {
        message
      }
    })

    return json({message: "Updated successfully"})
  } else if (request.method === "DELETE") {
    const messageId = formData.get("messageId");
    await prisma.message.delete({
      where: {
        id: messageId
      }
    });

    return json({message: "Deleted successfully"})
  }
}

export default function Index() {
  const data = useLoaderData();

  const [editFocus, setEditFocus] = useState("");

  return (
    <div>
      <Form method="post">
        <input type="text" name="message" id="message" />
        <button type="submit">Send</button>
      </Form>
      <ul>
        {data.messages.map((message) => (
          <li key={message.id}>
            {message.message}<br />
            {editFocus !== message.id && <button onClick={() => setEditFocus(message.id)}>Edit</button>}
            {editFocus === message.id && (
              <Form method="patch">
                <input type="hidden" name="messageId" value={message.id} />
                <input type="text" name="message" id="message" defaultValue={message.message} />
                <button type="submit">Edit</button>
              </Form>
            )}
            <Form method="delete">
              <input type="hidden" name="messageId" value={message.id} />
              <button type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader({ request }) {
  const messages = await prisma.message.findMany();

  return json({ messages });
}





