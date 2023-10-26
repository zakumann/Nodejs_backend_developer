import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController{
    @Get()
    hello(){
        return "Hello! My first Nest.js application.";
    }
}