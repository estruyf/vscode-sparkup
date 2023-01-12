import fetch from "node-fetch";
import { workspace, window } from "vscode";

const API_URL = "https://sparkup.p.rapidapi.com/api";
enum Endpoint {
  revision = "revision",
  seo = "seo",
}

export type IntendType = "spelling" | "biasfree" | "freeform" | "revision" | "seo";

export class AiService {
  
  public static async call(intend: IntendType, input: string, instruction?: string, keywords?: string) {
    let endpoint = Endpoint.revision;
    let body: any = {};

    // Get the API key from your settings
    const config = workspace.getConfiguration("sparkup");
    const apiKey = config.get("apiKey");
    if (!apiKey) {
      window.showErrorMessage("Sparkup: Please set your API key in the settings.");
      throw new Error("No API key set.");
    }

    if (intend === "seo") {
      endpoint = Endpoint.seo;
      body = {
        input,
        keywords,
      }
    } else {
      body = {
        intend,
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
      throw new Error("Something went wrong. Please try again.");
    }

    const result = await response.json();
    if (result?.result) {
      return result.result;
    }

    return undefined;
  }
}