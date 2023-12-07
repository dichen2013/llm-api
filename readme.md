# ChatGPT API <!-- omit in toc -->

> Node.js client for the official [ChatGPT](https://openai.com/blog/chatgpt/) API.

[![NPM](https://img.shields.io/npm/v/chatgpt.svg)](https://www.npmjs.com/package/chatgpt) [![Build Status](https://github.com/transitive-bullshit/chatgpt-api/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/chatgpt-api/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/chatgpt-api/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Updates](#updates)
- [CLI](#cli)
- [Install](#install)
- [Usage](#usage)
  - [Usage - ChatGPTAPI](#usage---chatgptapi)
  - [Usage - ChatGPTUnofficialProxyAPI](#usage---chatgptunofficialproxyapi)
    - [Reverse Proxy](#reverse-proxy)
    - [Access Token](#access-token)
- [Docs](#docs)
- [Demos](#demos)
- [Projects](#projects)
- [Compatibility](#compatibility)
- [Credits](#credits)
- [License](#license)

## Intro

This package is a Node.js wrapper around [ChatGPT](https://openai.com/blog/chatgpt) by [OpenAI](https://openai.com). TS batteries included. ✨

<p align="center">
  <img alt="Example usage" src="/media/demo.gif">
</p>

## Updates

<details open>
<summary><strong>April 10, 2023</strong></summary>

<br/>

This package now **fully supports GPT-4**! 🔥

We also just released a [TypeScript chatgpt-plugin package](https://github.com/transitive-bullshit/chatgpt-plugin-ts) which contains helpers and examples to make it as easy as possible to start building your own ChatGPT Plugins in JS/TS. Even if you don't have developer access to ChatGPT Plugins yet, you can still use the [chatgpt-plugin](https://github.com/transitive-bullshit/chatgpt-plugin-ts) repo to get a head start on building your own plugins locally.

If you have access to the `gpt-4` model, you can run the following to test out the CLI with GPT-4:

```bash
npx chatgpt@latest --model gpt-4 "Hello world"
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/552829/229368245-d22fbac7-4b56-4a5e-810b-5ac5793b6ac3.png" width="600px" alt="Using the chatgpt CLI with gpt-4">
</p>

We still support both the official ChatGPT API and the unofficial proxy API, but we now recommend using the official API since it's significantly more robust and supports **GPT-4**.

| Method                      | Free?  | Robust? | Quality?                        |
| --------------------------- | ------ | ------- | ------------------------------- |
| `ChatGPTAPI`                | ❌ No  | ✅ Yes  | ✅️ Real ChatGPT models + GPT-4 |
| `ChatGPTUnofficialProxyAPI` | ✅ Yes | ❌ No️  | ✅ ChatGPT webapp               |

**Note**: We strongly recommend using `ChatGPTAPI` since it uses the officially supported API from OpenAI. We will likely remove support for `ChatGPTUnofficialProxyAPI` in a future release.

1. `ChatGPTAPI` - Uses the `gpt-3.5-turbo` model with the official OpenAI chat completions API (official, robust approach, but it's not free)
2. `ChatGPTUnofficialProxyAPI` - Uses an unofficial proxy server to access ChatGPT's backend API in a way that circumvents Cloudflare (uses the real ChatGPT and is pretty lightweight, but relies on a third-party server and is rate-limited)

</details>

<details>
<summary><strong>Previous Updates</strong></summary>

<br/>

<details>
<summary><strong>March 1, 2023</strong></summary>

<br/>

The [official OpenAI chat completions API](https://platform.openai.com/docs/guides/chat) has been released, and it is now the default for this package! 🔥

| Method                      | Free?  | Robust?  | Quality?                |
| --------------------------- | ------ | -------- | ----------------------- |
| `ChatGPTAPI`                | ❌ No  | ✅ Yes   | ✅️ Real ChatGPT models |
| `ChatGPTUnofficialProxyAPI` | ✅ Yes | ☑️ Maybe | ✅ Real ChatGPT         |

**Note**: We strongly recommend using `ChatGPTAPI` since it uses the officially supported API from OpenAI. We may remove support for `ChatGPTUnofficialProxyAPI` in a future release.

1. `ChatGPTAPI` - Uses the `gpt-3.5-turbo` model with the official OpenAI chat completions API (official, robust approach, but it's not free)
2. `ChatGPTUnofficialProxyAPI` - Uses an unofficial proxy server to access ChatGPT's backend API in a way that circumvents Cloudflare (uses the real ChatGPT and is pretty lightweight, but relies on a third-party server and is rate-limited)

</details>

<details>
<summary><strong>Feb 19, 2023</strong></summary>

<br/>

We now provide three ways of accessing the unofficial ChatGPT API, all of which have tradeoffs:

| Method                      | Free?  | Robust?  | Quality?          |
| --------------------------- | ------ | -------- | ----------------- |
| `ChatGPTAPI`                | ❌ No  | ✅ Yes   | ☑️ Mimics ChatGPT |
| `ChatGPTUnofficialProxyAPI` | ✅ Yes | ☑️ Maybe | ✅ Real ChatGPT   |
| `ChatGPTAPIBrowser` (v3)    | ✅ Yes | ❌ No    | ✅ Real ChatGPT   |

**Note**: I recommend that you use either `ChatGPTAPI` or `ChatGPTUnofficialProxyAPI`.

1. `ChatGPTAPI` - (Used to use) `text-davinci-003` to mimic ChatGPT via the official OpenAI completions API (most robust approach, but it's not free and doesn't use a model fine-tuned for chat)
2. `ChatGPTUnofficialProxyAPI` - Uses an unofficial proxy server to access ChatGPT's backend API in a way that circumvents Cloudflare (uses the real ChatGPT and is pretty lightweight, but relies on a third-party server and is rate-limited)
3. `ChatGPTAPIBrowser` - (_deprecated_; v3.5.1 of this package) Uses Puppeteer to access the official ChatGPT webapp (uses the real ChatGPT, but very flaky, heavyweight, and error prone)

</details>

<details>
<summary><strong>Feb 5, 2023</strong></summary>

<br/>

OpenAI has disabled the leaked chat model we were previously using, so we're now defaulting to `text-davinci-003`, which is not free.

We've found several other hidden, fine-tuned chat models, but OpenAI keeps disabling them, so we're searching for alternative workarounds.

</details>

<details>
<summary><strong>Feb 1, 2023</strong></summary>

<br/>

This package no longer requires any browser hacks – **it is now using the official OpenAI completions API** with a leaked model that ChatGPT uses under the hood. 🔥

```ts
import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})

const res = await api.sendMessage('Hello World!')
console.log(res.text)
```

Please upgrade to `chatgpt@latest` (at least [v4.0.0](https://github.com/transitive-bullshit/chatgpt-api/releases/tag/v4.0.0)). The updated version is **significantly more lightweight and robust** compared with previous versions. You also don't have to worry about IP issues or rate limiting.

Huge shoutout to [@waylaidwanderer](https://github.com/waylaidwanderer) for discovering the leaked chat model!

</details>
</details>

If you run into any issues, we do have a pretty active [ChatGPT Hackers Discord](https://www.chatgpthackers.dev/) with over 8k developers from the Node.js & Python communities.

Lastly, please consider starring this repo and <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a> to help support the project.

Thanks && cheers,
[Travis](https://twitter.com/transitive_bs)

## CLI

To run the CLI, you'll need an [OpenAI API key](https://platform.openai.com/overview):

```bash
export OPENAI_API_KEY="sk-TODO"
npx chatgpt "your prompt here"
```

By default, the response is streamed to stdout, the results are stored in a local config file, and every invocation starts a new conversation. You can use `-c` to continue the previous conversation and `--no-stream` to disable streaming.

```
Usage:
  $ chatgpt <prompt>

Commands:
  <prompt>  Ask ChatGPT a question
  rm-cache  Clears the local message cache
  ls-cache  Prints the local message cache path

For more info, run any command with the `--help` flag:
  $ chatgpt --help
  $ chatgpt rm-cache --help
  $ chatgpt ls-cache --help

Options:
  -c, --continue          Continue last conversation (default: false)
  -d, --debug             Enables debug logging (default: false)
  -s, --stream            Streams the response (default: true)
  -s, --store             Enables the local message cache (default: true)
  -t, --timeout           Timeout in milliseconds
  -k, --apiKey            OpenAI API key
  -o, --apiOrg            OpenAI API organization
  -n, --conversationName  Unique name for the conversation
  -h, --help              Display this message
  -v, --version           Display version number
```

If you have access to the `gpt-4` model, you can run the following to test out the CLI with GPT-4:

<p align="center">
  <img src="https://user-images.githubusercontent.com/552829/229368245-d22fbac7-4b56-4a5e-810b-5ac5793b6ac3.png" width="600px" alt="Using the chatgpt CLI with gpt-4">
</p>

## Install

```bash
npm install chatgpt
```

Make sure you're using `node >= 18` so `fetch` is available (or `node >= 14` if you install a [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)).

## Usage

To use this module from Node.js, you need to pick between two methods:

| Method                      | Free?  | Robust? | Quality?                        |
| --------------------------- | ------ | ------- | ------------------------------- |
| `ChatGPTAPI`                | ❌ No  | ✅ Yes  | ✅️ Real ChatGPT models + GPT-4 |
| `ChatGPTUnofficialProxyAPI` | ✅ Yes | ❌ No️  | ✅ Real ChatGPT webapp          |

1. `ChatGPTAPI` - Uses the `gpt-3.5-turbo` model with the official OpenAI chat completions API (official, robust approach, but it's not free). You can override the model, completion params, and system message to fully customize your assistant.

2. `ChatGPTUnofficialProxyAPI` - Uses an unofficial proxy server to access ChatGPT's backend API in a way that circumvents Cloudflare (uses the real ChatGPT and is pretty lightweight, but relies on a third-party server and is rate-limited)

Both approaches have very similar APIs, so it should be simple to swap between them.

**Note**: We strongly recommend using `ChatGPTAPI` since it uses the officially supported API from OpenAI and it also supports `gpt-4`. We will likely remove support for `ChatGPTUnofficialProxyAPI` in a future release.

### Usage - ChatGPTAPI

Sign up for an [OpenAI API key](https://platform.openai.com/overview) and store it in your environment.

```ts
import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

You can override the default `model` (`gpt-3.5-turbo`) and any [OpenAI chat completion params](https://platform.openai.com/docs/api-reference/chat/create) using `completionParams`:

```ts
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  completionParams: {
    model: 'gpt-4',
    temperature: 0.5,
    top_p: 0.8
  }
})
```

If you want to track the conversation, you'll need to pass the `parentMessageId` like this:

```ts
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

// send a message and wait for the response
let res = await api.sendMessage('What is OpenAI?')
console.log(res.text)

// send a follow-up
res = await api.sendMessage('Can you expand on that?', {
  parentMessageId: res.id
})
console.log(res.text)

// send another follow-up
res = await api.sendMessage('What were we talking about?', {
  parentMessageId: res.id
})
console.log(res.text)
```

You can add streaming via the `onProgress` handler:

```ts
const res = await api.sendMessage('Write a 500 word essay on frogs.', {
  // print the partial response as the AI is "typing"
  onProgress: (partialResponse) => console.log(partialResponse.text)
})

// print the full text at the end
console.log(res.text)
```

You can add a timeout using the `timeoutMs` option:

```ts
// timeout after 2 minutes (which will also abort the underlying HTTP request)
const response = await api.sendMessage(
  'write me a really really long essay on frogs',
  {
    timeoutMs: 2 * 60 * 1000
  }
)
```

If you want to see more info about what's actually being sent to [OpenAI's chat completions API](https://platform.openai.com/docs/api-reference/chat/create), set the `debug: true` option in the `ChatGPTAPI` constructor:

```ts
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  debug: true
})
```

We default to a basic `systemMessage`. You can override this in either the `ChatGPTAPI` constructor or `sendMessage`:

```ts
const res = await api.sendMessage('what is the answer to the universe?', {
  systemMessage: `You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generating a list, do not have too many items.
Current date: ${new Date().toISOString()}\n\n`
})
```

Note that we automatically handle appending the previous messages to the prompt and attempt to optimize for the available tokens (which defaults to `4096`).

<details>
<summary>Usage in CommonJS (Dynamic import)</summary>

```js
async function example() {
  // To use ESM in CommonJS, you can use a dynamic import like this:
  const { ChatGPTAPI } = await import('chatgpt')
  // You can also try dynamic importing like this:
  // const importDynamic = new Function('modulePath', 'return import(modulePath)')
  // const { ChatGPTAPI } = await importDynamic('chatgpt')

  const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

</details>

### Usage - ChatGPTUnofficialProxyAPI

The API for `ChatGPTUnofficialProxyAPI` is almost exactly the same. You just need to provide a ChatGPT `accessToken` instead of an OpenAI API key.

```ts
import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

See [demos/demo-reverse-proxy](./demos/demo-reverse-proxy.ts) for a full example:

```bash
npx tsx demos/demo-reverse-proxy.ts
```

`ChatGPTUnofficialProxyAPI` messages also contain a `conversationid` in addition to `parentMessageId`, since the ChatGPT webapp can't reference messages across different accounts & conversations.

#### Reverse Proxy

You can override the reverse proxy by passing `apiReverseProxyUrl`:

```ts
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
  apiReverseProxyUrl: 'https://your-example-server.com/api/conversation'
})
```

Known reverse proxies run by community members include:

| Reverse Proxy URL                                 | Author                                       | Rate Limits                  | Last Checked |
| ------------------------------------------------- | -------------------------------------------- | ---------------------------- | ------------ |
| `https://ai.fakeopen.com/api/conversation` | [@pengzhile](https://github.com/pengzhile)   | 5 req / 10 seconds by IP     | 4/18/2023    |
| `https://api.pawan.krd/backend-api/conversation`  | [@PawanOsman](https://github.com/PawanOsman) | 50 req / 15 seconds (~3 r/s) | 3/23/2023    |

Note: info on how the reverse proxies work is not being published at this time in order to prevent OpenAI from disabling access.

#### Access Token

To use `ChatGPTUnofficialProxyAPI`, you'll need an OpenAI access token from the ChatGPT webapp. To do this, you can use any of the following methods which take an `email` and `password` and return an access token:

- Node.js libs
  - [ericlewis/openai-authenticator](https://github.com/ericlewis/openai-authenticator)
  - [michael-dm/openai-token](https://github.com/michael-dm/openai-token)
  - [allanoricil/chat-gpt-authenticator](https://github.com/AllanOricil/chat-gpt-authenticator)
- Python libs
  - [acheong08/OpenAIAuth](https://github.com/acheong08/OpenAIAuth)

These libraries work with email + password accounts (e.g., they do not support accounts where you auth via Microsoft / Google).

Alternatively, you can manually get an `accessToken` by logging in to the ChatGPT webapp and then opening `https://chat.openai.com/api/auth/session`, which will return a JSON object containing your `accessToken` string.

Access tokens last for days.

**Note**: using a reverse proxy will expose your access token to a third-party. There shouldn't be any adverse effects possible from this, but please consider the risks before using this method.

## Docs

See the [auto-generated docs](./docs/classes/ChatGPTAPI.md) for more info on methods and parameters.

## Demos

Most of the demos use `ChatGPTAPI`. It should be pretty easy to convert them to use `ChatGPTUnofficialProxyAPI` if you'd rather use that approach. The only thing that needs to change is how you initialize the api with an `accessToken` instead of an `apiKey`.

To run the included demos:

1. clone repo
2. install node deps
3. set `OPENAI_API_KEY` in .env

A [basic demo](./demos/demo.ts) is included for testing purposes:

```bash
npx tsx demos/demo.ts
```

A [demo showing on progress handler](./demos/demo-on-progress.ts):

```bash
npx tsx demos/demo-on-progress.ts
```

The on progress demo uses the optional `onProgress` parameter to `sendMessage` to receive intermediary results as ChatGPT is "typing".

A [conversation demo](./demos/demo-conversation.ts):

```bash
npx tsx demos/demo-conversation.ts
```

A [persistence demo](./demos/demo-persistence.ts) shows how to store messages in Redis for persistence:

```bash
npx tsx demos/demo-persistence.ts
```

Any [keyv adaptor](https://github.com/jaredwray/keyv) is supported for persistence, and there are overrides if you'd like to use a different way of storing / retrieving messages.

Note that persisting message is required for remembering the context of previous conversations beyond the scope of the current Node.js process, since by default, we only store messages in memory. Here's an [external demo](https://github.com/transitive-bullshit/chatgpt-twitter-bot/blob/main/src/index.ts#L86-L95) of using a completely custom database solution to persist messages.

**Note**: Persistence is handled automatically when using `ChatGPTUnofficialProxyAPI` because it is connecting indirectly to ChatGPT.

