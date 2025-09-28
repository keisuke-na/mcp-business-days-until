#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !==6;
}

function calculateBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while(current <= endDate) {
    if(isBusinessDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

const server = new McpServer({
  name: "Business Days Until Server",
  version: "1.0.0",
})

server.tool(
  'business_days_until',
  {
    startDate: z.string().optional().describe("Start date (YYYY-MM-DD format, defaults to today)"),
    targetDate: z.string().describe("Target date (YYYY-MM-DD format)")
  },
  async ({ startDate, targetDate }) => {
    const start = startDate ? new Date(startDate) : new Date();
    start.setHours(0, 0, 0, 0);

    if(startDate && isNaN(start.getTime())) {
      return {
        content: [
          {
            type: "text",
            text: "Error: Invalid start date"
          }
        ]
      }
    }

    const target = new Date(targetDate);
    if(isNaN(target.getTime())) {
      return {
        content: [
          {
            type: "text",
            text: 'Error: Invalid target date'
          }
        ]
      };
    }

    const businessDays = calculateBusinessDays(start, target);
    return {
      content: [
        {
          type: "text",
          text: `Business days: ${businessDays}`
        }
      ]
    };
  }
)


const transport = new StdioServerTransport();
await server.connect(transport);