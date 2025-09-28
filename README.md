# @keisuke-na/mcp-business-days-until

MCP server for calculating business days between two dates.

## Installation

```bash
npm install -g @keisuke-na/mcp-business-days-until
```

## Usage with Claude Code

Add the following to your Claude Code configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "business-days": {
      "command": "npx",
      "args": ["-y", "@keisuke-na/mcp-business-days-until"],
      "env": {
        "PATH": "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

Note: Adjust the PATH according to your system. You can find your PATH by running `echo $PATH` in terminal.

## Features

- Calculate business days (excluding weekends) between two dates
- Optional start date (defaults to today)
- Clear error messages for invalid dates

## Tool

### business_days_until

Calculate business days between start date and target date.

**Parameters:**
- `startDate` (optional): Start date in YYYY-MM-DD format (defaults to today)
- `targetDate` (required): Target date in YYYY-MM-DD format

**Example:**
```
startDate: "2024-01-01"
targetDate: "2024-01-31"
Result: Business days: 23
```

## License

MIT