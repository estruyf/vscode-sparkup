import fetch from "node-fetch";
import { workspace, window } from "vscode";

const API_URL = "https://sparkup.p.rapidapi.com/api";
// const API_URL = "http://localhost:7071/api";
enum Endpoint {
  revision = "revision",
  seo = "seo",
  headline = "headline",
}

export type IntentType = "spelling" | "biasfree" | "freeform" | "revision" | "seo" | "headline" | "simplify";

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
      console.log(response.statusText);
      throw new Error("Something went wrong. Please try again.");
    }

    const result = await response.json();
    if (result?.result) {
      return result.result;
    }

    return undefined;
  }
}