import fetch from "node-fetch";
import { workspace, window } from "vscode";
import { Logger } from "./Logger";

const API_URL = "https://sparkup.p.rapidapi.com/api";
// const API_URL = "http://localhost:7071/api";

enum Endpoint {
  revision = "revision",
  seo = "seo",
  headline = "headline",
  categorization = "categorization",
}

export type IntentType = "spelling" | "biasfree" | "freeform" | "revision" | "seo" | "headline" | "simplify" | "categorization";

export class AiService {
  
  public static async call(intent: IntentType, input: string, instruction?: string, keywords?: string) {
    let endpoint = Endpoint.revision;
    let body: any = {};

    // Get the API key from your settings
    const config = workspace.getConfiguration("sparkup");
    const apiKey = config.get("apiKey");
    if (!apiKey) {
      window.showErrorMessage("Sparkup: Please set your API key in the settings.");
      throw new Error("No API key set.");
    }

    if (intent === "seo") {
      endpoint = Endpoint.seo;
      body = {
        input,
        keywords,
      }
    } else if (intent === "headline") {
      endpoint = Endpoint.headline;
      body = {
        input
      };
    } else if (intent === "categorization") {
      endpoint = Endpoint.categorization;
      body = {
        input
      };
    } else {
      body = {
        intent,
        input,
        instruction,
      };
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'sparkup.p.rapidapi.com',
        'user-agent': 'vscode-sparkup'
      } as any,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      if (response.status === 429) {
        window.showErrorMessage(`Sparkup: You've reached your daily limit. Please upgrade your plan or try again later.`);
      } else {
        window.showErrorMessage(`Sparkup: Sorry, something went wrong. Please try again.`);
      }
      Logger.info(`Sparkup: Error calling ${endpoint} endpoint. Status: ${response.status}. Status text: ${response.statusText}`);
      throw new Error("Something went wrong. Please try again.");
    }

    const result = await response.json();
    if (result?.result) {
      return result.result;
    }

    return undefined;
  }
}