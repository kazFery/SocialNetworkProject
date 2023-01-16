import React from "react";
import { Fragment } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const snpData = [
    {
        date: "9/5/2022",
        posts: 120
    },
    {
        date: "9/6/2022",
        posts: 100
    },
    {
        date: "9/7/2022",
        posts: 140
    },
    {
        date: "9/8/2022",
        posts: 50
    },
    {
        date: "9/9/2022",
        posts: 40
    },
];

export default function SimpleChart() {


    return (
        <Fragment>
            <div className="container py-4 px-4" style={{ backgroundColor: "#CDE4FB" }}>
                <h3 className="text-center mb-4">Number of Posts</h3>
                <ResponsiveContainer width={"100%"} aspect={3}>
                    <LineChart data={snpData}>
                        <XAxis dataKey="date" />
                        <Line dataKey="posts" type="monotone" activeDot={{ r: 8 }} stroke="#0277CC" />
                        <YAxis />
                        <CartesianGrid stroke="#79A3F3" strokeDasharray="3 3" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Fragment>
    )
}