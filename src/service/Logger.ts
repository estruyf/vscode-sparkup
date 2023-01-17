import { OutputChannel, window } from 'vscode';

export class Logger {
  private static instance: Logger;
  public static channel: OutputChannel | null = null; 

  private constructor() {
    const title = "Sparkup";
    Logger.channel = window.createOutputChannel(title);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public static info(message: string, type: "INFO" | "WARNING" | "ERROR" = "INFO"): void {
    if (!Logger.channel) {
      Logger.getInstance();
    }

    Logger.channel?.appendLine(`[${new Date().toISOString()}] [${type}]
> ${message}`);
  }

  public static warning(message: string): void {
    Logger.info(message, "WARNING");
  }

  public static error(message: string): void {
    Logger.info(message, "ERROR");
  }
}