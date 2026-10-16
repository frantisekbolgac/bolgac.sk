---
title: "A European AI provider and sensitive data: what ZDR, DPA and GDPR really mean"
description: "An audit of ten AI providers: where the model runs, whether data is stored and what the contract says. An EU company or a no-training promise is not enough."
image: "/blog/ZDR-DPA-GDPR-poskytovatelia-AI/zdr-dpa-gdpr-en.jpg"
pubDate: 2026-09-24
tags:
  - ai
  - gdpr
  - data-sovereignty
  - cloud
---

**TL;DR:** When a company sends sensitive data to AI through an API, it is not enough that the provider has a European entity and promises not to train on the data. Three separate things need checking: whether the content is really not stored after processing (ZDR), whether there is a data processing agreement (DPA), and whether the documentation proves it. ZDR does not apply to a provider as a whole, but to a specific service, model and setting. Of the ten providers checked, only three European ones document it without an extra step: OVHcloud, STACKIT and IONOS, and only for selected services.

## What this is about

When an application or automation uses AI, it sends text through an API (a programming interface) to a provider, which runs the model on its servers and returns the answer. Running the model is called inference, and the company that does it is an inference provider.

When choosing one, people usually look at two things: whether the provider has a company in the EU, and whether it promises not to use the data for training. Neither tells you what happens to the data. So first it needs to be clear **what data we send, where it may be processed and what the provider does with it**. Only then does it make sense to choose a specific service.

## Scope of the audit

I did the audit as of **31 August 2026**, added changes as of **24 September 2026**, and re-checked the whole of it against the sources as of **16 October 2026**. It is a snapshot of public evidence on those dates, not a permanent guarantee or legal advice. ZDR, endpoints (specific service addresses) and regional options change, so the current documentation and the settings of the specific account always decide.

The main part compares hosted inference APIs operated by a company based in the EU that offer verified processing in the EU. The comparison includes:

- synchronous and asynchronous inference APIs (answer now or later) with an option to choose processing in Europe,
- services meant for real use in an application or automation,
- providers that publish contractual or technical processing terms.

Anthropic, xAI and Kimi are added for comparison, outside this European part.

I left out chat apps for end users, pure GPU and server rental, self-host-only products, US hyperscalers (large cloud providers) with an EU processing option, and narrowly specialised APIs. I would be comparing a different type of product.

One more note on data. Its classification determines the processing conditions, the technical and organisational measures needed and the scope of the assessment. On its own it does not decide whether a provider can be used. Special categories of personal data under Article 9 GDPR (e.g. health data) have their own legal framework and are assessed separately; meeting Article 6 GDPR does not cover them.

## Three layers that must not be confused

### ZDR: a technical property of a specific service

ZDR (zero data retention) means that **the content of a specific request and response is not stored after processing**. A general definition is not enough for an audit. The scope has to be assessed for each endpoint separately, including legal exceptions, retention for safety and application state (e.g. a stored conversation). Even a common base for a whole platform does not prove the same scope for every product. A partner, regional, batch, stateful or "on request" mode can have different terms.

I do not consider these to be ZDR:

- encryption of data in transit,
- location in the EU,
- a promise that data is not used for training,
- later deletion,
- short-term retention only for abuse monitoring or debugging.

### DPA: the contractual layer

A DPA (data processing agreement) is a contract under Article 28 GDPR, typically between the controller (the company the data belongs to) and the processor (the AI provider). In the audit I treat it as evidence that a contractual framework exists that can be accepted and included in the service contract.

A DPA alone does not make using the service GDPR-compliant. The legal basis, the purpose of processing and the impact assessment (DPIA), where Article 35 requires it, are the customer's responsibility. The processor provides cooperation and has its own obligations under Articles 28 and 32 GDPR.

### GDPR: evidence, not a marketing sentence

"EU region" in an offer is not enough for GDPR. I look for evidence that:

- the specific endpoint or model processes data in the required location,
- data is really removed after the request,
- the retention exceptions are known,
- the contractual documentation is available,
- ZDR covers the API feature and the model used.

Without verifiable evidence, "ZDR" is only a claim.

## Audit results

The ZDR column uses four states:

- **Documented:** explicit evidence in the provider's public documentation. It is not independent verification of operations or a legal certificate.
- **Documented after approval / after enablement:** the customer has to take an extra step (request it, switch it on).
- **Does not meet the strict criterion:** a documented exception or retention that does not fit ZDR as defined in this table.
- **Unproven:** a public source did not confirm the point.

The DPA column shows the verified contract status where it can be evidenced.

| Provider | Where the model runs and where data is | ZDR | Contract (DPA) and evidence | Scope and exceptions |
|---|---|---|---|---|
| **OVHcloud / OVH SAS** | Gravelines, France | **Documented for synchronous AI Endpoints** | [DPA](https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-gb.pdf) and public documentation | Batch and Files work with stored files and are outside strict ZDR. Batch output and error files are deleted automatically after 15 days; the documentation gives no period for input files. |
| **STACKIT / Schwarz Digits Cloud** | Region EU01; neither the documentation nor the certificate names a specific data centre | **Documented** | [Public DPA](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12) and Service Certificate | Data and queries are neither stored nor used for training. According to the certificate, requests are not backed up; e-mail and subject ID stay in the service logs for 30 days. |
| **IONOS Cloud / IONOS SE** | German data centres; stateless Model Hub | **Documented for stateless Model Hub** | [DPA](https://www.ionos.co.uk/terms-gtc/data-processing-agreement) and public documentation | Prompts and outputs are not written to persistent storage after the request according to the current documentation; operational metadata remains. |
| **Scaleway SAS** | Paris, France | **Does not meet the strict criterion** | [Public DPA](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf) and Generative APIs Privacy Policy | It is close to ZDR in normal operation, but HTTP requests may remain for up to two weeks after reliability-impacting errors or suspected misuse; anonymous metadata may be retained for up to six months. |
| **Nebius Token Factory / Nebius B.V.** | Public endpoints without a region guarantee (location decided dynamically); a dedicated endpoint has a contractually fixed region | **Documented after enablement** | [Public DPA](https://docs.nebius.com/legal/dpa) (effective 15 September 2026) and public documentation | Prompts and outputs are stored by default for speculative decoding. ZDR is enabled for the whole organisation and disables that storage; Finland is the storage location, not evidence of the inference location. |
| **Mistral AI** | `api.eu.mistral.ai`; EU and EFTA; the control plane is not regional | **Documented after approval** | [ZDR](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention) and regional [documentation](https://docs.mistral.ai/inference/regional-inference) | Applies to supported stateless APIs on paid plans, after approval (requests can be denied). It does not cover Labs models or stateful products: Agents, Batch, Conversations, Libraries, Files, Vibe Work and Chat. |
| **OpenAI API / OpenAI Ireland Ltd.** | **Europe (EEA + Switzerland)** via `eu.api.openai.com`; requires approval for abuse monitoring controls | **Documented after approval** | [DPA](https://openai.com/policies/data-processing-addendum/) and retention amendment | ZDR applies only to supported endpoints and models; system data and some features are outside ZDR. Images flagged as potential CSAM are kept for manual review even under ZDR. |
| **Anthropic / Anthropic Ireland Limited** | Direct Claude API: the cited documentation does not establish EU inference; a partner regional route is a separate product | **Documented after approval** | [DPA](https://www.anthropic.com/legal/data-processing-addendum) and regional [documentation](https://platform.claude.com/docs/en/manage-claude/data-residency) | Fable 5, Fable 5.1, Mythos 5 and Mythos 5.1 have 30-day retention. Flagged chat/session inputs and outputs may be retained for up to two years even under ZDR. EFS is a progressively available architecture. |
| **xAI (now SpaceXAI, a SpaceX division)** | The default global endpoint does not guarantee a region; a separate US endpoint (grok-4.7 and grok-4.6 only) | **Documented after enablement** | [DPA](https://x.ai/legal/data-processing-addendum) branded SpaceXSI, contracting party SpaceXAI LLC, effective 22 September 2026 | ZDR applies to the whole team; an admin enables it in the console, some teams through sales. Requests and responses are kept for 30 days by default; ZDR disables that and blocks stateful Responses, Files, Collections, Batch, Deferred completions and stored image/video outputs. |
| **Kimi / Moonshot AI PTE. LTD.** | The cited ZDR document does not specify a processing region | **Documented after approval; limited scope** | No DPA in the cited sources; the terms are governed by Singapore law | Enterprise ZDR on request: prompts and responses are deleted as soon as the response is returned. Outside ZDR: Batch API, image and video uploads through the File Upload API, third-party connectors and operational data. The standard terms allow customer content to be used to develop the services unless agreed otherwise in writing. |

## European providers

The table is not a ranking. It is a map of products against the chosen criteria.

**OVHcloud, STACKIT and IONOS** offer simple inference services with processing in Europe and different scopes of ZDR. This does not apply to their whole portfolio. Batch, files, stateful collections or other APIs can have other rules.

**Scaleway** shows why a ZDR label alone can be inaccurate. If a provider keeps a request after an error or on suspected abuse, strict ZDR does not apply, even though normal operation behaves almost like ZDR.

**Nebius** offers an explicit technical setting, but ZDR is not the default. The configuration and the specific product decide, not the provider's name.

**Mistral** shows another limit: ZDR is available only on paid plans, only after approval and only for selected stateless APIs. Regional processing in the EU costs 1.1 times the standard price and does not support stateful features such as Agents, Batch or the Files API. An "EU endpoint" also does not have to mean only EU member states, if the documentation also covers EFTA or some terms allow further processing.

## OpenAI, Anthropic and xAI

### OpenAI

For customers who meet the conditions, ZDR at OpenAI matters: since 19 August 2026 it allows using the most capable (frontier) models without standard storage of prompts and responses on supported endpoints. ZDR is subject to prior approval by OpenAI and acceptance of additional requirements. Even under ZDR not everything is deleted: images flagged as potential CSAM (child sexual abuse material) are kept for manual review. Without ZDR, abuse monitoring logs are kept for up to 30 days by default.

According to the DPA, the contracting party for customers based in the EEA or Switzerland is OpenAI Ireland Ltd. That does not mean the data is physically processed in Ireland. OpenAI uses the exact name **Europe (EEA + Switzerland)**, not "EU region". European data residency requires approval for abuse monitoring controls (e.g. ZDR) and is set when a project is created; an existing project cannot be switched later. System data (account, metadata, usage data) may be processed and stored outside the selected region. ZDR applies only to supported endpoints and models; unsupported models, endpoints and some features have their own rules. The specific model, endpoint and feature always need to be checked against the current ZDR table.

### Anthropic

According to the cited documentation, the direct Claude API has the values `global` or `us` for the `inference_geo` parameter, so EU inference is not established. Regional options through a supported partner are a separate route and need to be checked separately. ZDR on the Claude API is activated for a specific organisation through sales and does not apply automatically to new organisations. Fable 5, Fable 5.1, Mythos 5 and Mythos 5.1 are so-called Covered Models with mandatory 30-day retention and are not available under ZDR unless Anthropic expressly authorises it. An organisation with ZDR can make them available in one workspace by enabling 30-day retention for that workspace; other workspaces stay on ZDR.

On 1 September 2026 Anthropic announced Enterprise Frontier Safeguards (EFS), an architecture to be rolled out in phases from autumn 2026. It is not general ZDR: the customer can keep monitoring data in its own cloud account and under its own encryption keys, automated systems send flags directly to the customer's team, and no human review by Anthropic employees is required. Until EFS is ready, eligible customers receive ZDR on Fable 5 and Fable 5.1. The announcement says nothing about Mythos models.

Anthropic also states that if the system flags content, chat or session inputs and outputs may stay stored for up to two years, even under ZDR. This exception cannot be overlooked.

### xAI

xAI is no longer a standalone company: it is SpaceXAI, a division of SpaceX, and according to an announcement on 4 October 2026 it is to be renamed SpaceXSI. The current DPA (effective 22 September 2026) is branded SpaceXSI, with SpaceXAI LLC as the contracting party.

Customers switch ZDR on themselves (some teams through sales), but always for the whole team. All API keys in the team must use ZDR; it cannot be enabled for one key only. ZDR blocks stateful features: Responses API, Files, Collections, Batch, Deferred completions and stored image and video outputs. Without ZDR, API requests and responses are kept for 30 days. The default global endpoint does not guarantee the processing location; a separate US endpoint exists, but it offers only the grok-4.7 and grok-4.6 models.

## Large Chinese models

There is no single common grade here:

- **Kimi / Moonshot AI** publishes ZDR for enterprise customers on request: prompts and responses are deleted as soon as the response is returned. The documentation does not state the processing location, and ZDR does not cover the Batch API, image and video uploads through the File Upload API, third-party connectors or operational data. The standard terms allow customer content to be used to develop the services unless agreed otherwise in writing, and are governed by Singapore law. DPA and processing location are not established in the cited sources.
- **DeepSeek** states in its privacy policy that it processes data in China for its own services and may keep data while the account exists. It explicitly excludes data of end users of applications that developers build on DeepSeek (the developer is the controller), but does not clarify how that data sent through the API is handled. The policy was last updated on 10 February 2026. In the audit its status is therefore unproven, not a definitive fail. Switching off the use of data for model improvement, where available, is not ZDR.
- **Qwen through Alibaba Cloud Model Studio** says it will never use customer data for training and encrypts data transmitted during application building and model training with AES-256. The documentation also says that Model Studio stores data generated by the model and the application. A Frankfurt endpoint and processing of all operations in the EU need a separate source; without one, European residency is unproven.
- **MiniMax:** in this check I did not find enough official public evidence on ZDR, DPA or regional processing. Missing evidence means the status unproven, not confirmed ZDR.
- **Open-weight models** (models with published weights) can run on your own infrastructure or at a European inference provider. With your own hosting, the data path can be controlled by architecture, if operations, storage, logs and subcontractors are also under control. The model author's direct API is a different service from a European host that runs the same model.

This leads to an important distinction: **the origin of a model and the inference provider are not the same thing**. A Chinese model can run in the EU with its own ZDR, while its direct API may process data in China without a suitable retention guarantee.

## How I would choose a provider

This is not a guide to enabling a service, but an order of decisions:

1. **Data.** I split data by type and sensitivity and decide whether it is personal data or a special category under Article 9 GDPR. That sets the processing conditions, the measures needed and the limits to check. Classification alone does not decide whether a provider can be used; that also depends on the legal basis, the contract and the specific setting.
2. **Boundary.** I decide where data may go and where it must stay. Private or sensitive data that should not leave my encrypted disk does not go to an inference service just because the provider promises ZDR.
3. **Endpoint.** I do not check the brand, but the specific endpoint, model and mode. A direct model call can behave differently from Batch, Files, Agents or stateful collections.
4. **Contract.** Before processing production data, I check the DPA, the processor role, the retention exceptions and the terms for subcontractors.
5. **Evidence.** I compare the technical documentation, the current settings and the contract. A marketing label is not enough.

Public data can take a different path. It can be in an ordinary cloud on purpose, so that it is available, indexable and searchable. Private data can stay on an encrypted disk, and inference for it is handled differently.

## Why one of the three is not enough

A provider can have ZDR, but without a suitable DPA the contractual framework for processing personal data is missing (the legal basis is determined separately under Article 6 GDPR). It can have a DPA, but without ZDR it can keep data longer than needed. And it can have both, while the customer still sends it data it should not receive.

Data sovereignty therefore does not end with choosing a "European" cloud. It is made of the whole chain: data classification, processing location, technical retention, contractual responsibility and the way an organisation proves that all of this really holds.

## Sources

Sources were re-checked as of 16 October 2026. Not re-checked (page not available to automated reading, or not opened): the IONOS, STACKIT and Scaleway DPAs, the Mistral Help Center, the Anthropic DPA and the OpenAI retention amendment. ZDR and regional options can change, so for production use the current documentation and the specific account need to be checked.

- [OVHcloud — AI Endpoints: Getting started](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started)
- [OVHcloud — Data Processing Agreement (EU)](https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-gb.pdf)
- [OVHcloud — AI Endpoints capabilities](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-capabilities)
- [OVHcloud — AI Endpoints: Batch mode](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-batch-mode)
- [STACKIT — AI Model Serving FAQ](https://docs.stackit.cloud/products/data-and-ai/ai-model-serving/faq)
- [STACKIT — AI Model Serving](https://stackit.com/en/products/data-ai/stackit-ai-model-serving)
- [STACKIT — Data Processing Agreement](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12)
- [STACKIT — AI Model Serving Service Certificate](https://stackit.com/en/asset/download/34346/file/Service_Certificate_STACKIT_AI_Model_Serving.pdf?version=10)
- [IONOS — AI Model Hub Data Handling](https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/data-handling)
- [IONOS — Data Processing Agreement](https://www.ionos.co.uk/terms-gtc/data-processing-agreement)
- [Scaleway — Generative APIs Privacy Policy](https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy.md)
- [Scaleway — Data Processing Agreement](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf)
- [Nebius — Legal Quick Guide](https://docs.tokenfactory.nebius.com/legal/legal-quick-guide)
- [Nebius — Data Processing Agreement](https://docs.nebius.com/legal/dpa)
- [Mistral — Zero Data Retention](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention)
- [Mistral — ZDR Help Center](https://help.mistral.ai/en/articles/347612-can-i-activate-zero-data-retention-zdr)
- [Mistral — Regional inference](https://docs.mistral.ai/inference/regional-inference)
- [OpenAI — Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/)
- [OpenAI — Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data)
- [OpenAI — Introducing data residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/)
- [OpenAI — Data Processing Addendum](https://openai.com/policies/data-processing-addendum/)
- [Anthropic — API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- [Anthropic — Data residency](https://platform.claude.com/docs/en/manage-claude/data-residency)
- [Anthropic — Enterprise Frontier Safeguards](https://www.anthropic.com/news/enterprise-frontier-safeguards)
- [xAI — API Security and Zero Data Retention](https://docs.x.ai/developers/faq/security)
- [xAI — Data Processing Addendum](https://x.ai/legal/data-processing-addendum)
- [Not a Tesla App — SpaceXAI will be renamed SpaceXSI (5 October 2026)](https://www.notateslaapp.com/news/4770/musk-spacexai-will-be-renamed-spacexsi-dropping-ai)
- [Kimi — Zero Data Retention](https://platform.kimi.ai/docs/guide/zero-data-retention)
- [Moonshot AI — Kimi OpenPlatform Terms of Service](https://platform.kimi.ai/docs/agreement/modeluse)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Alibaba Cloud Model Studio — Security certifications and privacy](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [EUR-Lex — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
