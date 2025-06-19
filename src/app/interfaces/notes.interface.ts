import { Types } from "mongoose";

export interface notes{
title:string,
content:string,
category:string,
pinned:boolean,
tags:string,
userId:Types.ObjectId
}