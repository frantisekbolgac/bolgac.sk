---
title: "ZDR, DPA and GDPR when choosing European AI providers"
description: "How I separate technical guarantees, contractual coverage and evidence when choosing an inference provider for sensitive data."
image: "/blog/ZDR-DPA-GDPR-poskytovatelia-AI/zdr-dpa-gdpr-en.jpg"
pubDate: 2026-09-24
tags:
  - ai
  - gdpr
  - data-sovereignty
  - cloud
---

When choosing an AI inference provider, it is easy to focus on two things: the provider has a European entity and promises not to use the data for training. Neither is enough on its own.

The first question is not which framework or cloud is best. The first question is: **what data are we sending, where should it be processed, and what will the provider do with it?** Only after that do we choose a specific service.

## What the audit does and does not cover

The audit was conducted on **31 August 2026**. It is a point-in-time snapshot of evidence, not a permanent guarantee or legal advice. It primarily compares commercially usable hosted inference APIs operated by a legal entity established in the EU and offering documented EU processing. Anthropic, xAI and Kimi are included as comparison profiles outside that narrow EU-focused group.

Claims and documentation that changed after 31 August 2026 are presented as an update current to **24 September 2026**. ZDR, endpoint eligibility and regional options can change, so the current documentation and the specific account configuration are decisive.

Included in the main matrix:

- synchronous and asynchronous inference APIs with an EU processing option,
- services intended for real use in an application or automation,
- providers with public contractual or technical information relevant to processing.

The main matrix excludes end-user chat SaaS, GPU/IaaS-only offers, self-host-only products, US hyperscalers with an EU option, and narrowly specialized APIs. This is not a judgement that they are bad; it avoids comparing different products as if they were the same.

Data classification determines the processing conditions, the technical and organisational measures required, and the scope of the assessment. It does not automatically mean that a provider may or may not be used. Special categories of personal data under Article 9 GDPR have their own legal framework and must be assessed separately; compliance with Article 6 alone does not cover them.

## Three layers that must not be confused

### ZDR is a technical property of a specific service

ZDR means that **the content of a specific request and response is not stored after processing**. Basic ZDR definitions are not enough for an audit: the scope must be assessed for each endpoint separately, including legal exceptions, safety retention and application state. A shared platform baseline does not prove an identical scope for every product, because partner, regional, batch, stateful or on-request modes may have different terms. It is not automatically a property of an entire provider brand.

I do not treat the following as ZDR:

- encryption in transit,
- EU residency,
- a claim that data is not used for training,
- deletion at a later point,
- short-term retention only for abuse monitoring or debugging.

### DPA is the contractual layer

A DPA is an agreement under Article 28 of the GDPR, typically between the controller and the processor. In this audit, I treat it as evidence that a contractual framework exists that can be accepted and incorporated into the service contract.

A DPA does not by itself make the customer's use of the service compliant with the GDPR. The controller remains responsible for the legal basis, processing purpose and DPIA, where required under Article 35; the processor assists and has its own obligations under Articles 28 and 32.

### GDPR evidence is not a marketing sentence

Having an "EU region" is not enough. The relevant question is whether there is evidence that:

- the specific endpoint or model processes data in the required location,
- data is actually deleted after the request,
- retention exceptions are known,
- contractual documentation is available,
- the ZDR statement applies to the API feature and model being used.

Without verifiable evidence, "ZDR" is only a claim.

## Audit results

The table includes the verified DPA status where it can be supported. `Documented` means there is explicit evidence in the provider's public documentation; it is not independent verification of the customer's deployment or a legal certification. `Documented after approval or enablement` requires an additional customer-side step. `Does not meet the strict criterion` means that a documented exception or retention period falls outside the ZDR defined in this table. `Unverified` means that the cited public source did not confirm the point.

| Provider | Inference and storage location | ZDR verdict | DPA and evidence | Scope and exceptions |
|---|---|---|---|---|
| **OVHcloud / OVH SAS** | Gravelines, France | **Documented for synchronous AI Endpoints** | [Public DPA](https://us.ovhcloud.com/legal/data-processing-agreement) and public documentation | Batch and Files use stored input and output files with their own retention and are outside strict ZDR. |
| **STACKIT / Schwarz Digits Cloud** | EU01, Germany South | **Documented** | [Public DPA](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12) and Service Certificate | Documentation says data and queries are neither stored nor used for training. |
| **IONOS Cloud / IONOS SE** | German data centres; stateless Model Hub | **Documented for stateless Model Hub** | [DPA](https://www.ionos.co.uk/terms-gtc/data-processing-agreement) and public documentation | Prompts and outputs are not written to persistent storage after the request according to the current documentation; operational metadata remains. |
| **Scaleway SAS** | Paris, France | **Does not meet the strict criterion** | [Public DPA](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf) and Generative APIs Privacy Policy | It is close to ZDR in normal operation, but HTTP requests may remain for up to two weeks after reliability-impacting errors or suspected misuse; anonymous metadata may be retained for up to six months. |
| **Nebius Token Factory / Nebius B.V.** | Public endpoints do not provide a general regional guarantee; a dedicated endpoint has a contractual region | **Documented after enablement** | [Public DPA](https://docs.tokenfactory.nebius.com/legal/dpa) and public documentation | Prompts and outputs are stored by default for speculative decoding. ZDR disables that storage; Finland in the storage context is not evidence of the inference location. |
| **Mistral AI** | `api.eu.mistral.ai`; EU and EFTA; the control plane is not regional | **Documented after approval** | [ZDR](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention) and regional [documentation](https://docs.mistral.ai/inference/regional-inference) | Applies to supported stateless APIs with `pay-as-you-go` and approval. It does not cover Labs models or stateful products such as Agents, Batch, Conversations, Libraries, Files and Vibe Work. |
| **OpenAI API / OpenAI Ireland Ltd.** | **Europe (EEA + Switzerland)** via `eu.api.openai.com` | **Documented after approval** | [DPA](https://openai.com/policies/data-processing-addendum/) and retention amendment | ZDR applies only to supported endpoints and models; system metadata and some features are outside ZDR. The specific endpoint and feature must be checked in the current ZDR table. |
| **Anthropic / Anthropic Ireland Limited** | Direct Claude API: the cited documentation does not establish EU inference; a partner regional route is a separate product | **Documented after approval** | [DPA](https://www.anthropic.com/legal/data-processing-addendum) and regional [documentation](https://platform.claude.com/docs/en/manage-claude/data-residency) | Fable 5, Fable 5.1, Mythos 5 and Mythos 5.1 have 30-day retention. Flagged chat/session inputs and outputs may be retained for up to two years even under ZDR. EFS is a progressively available architecture. |
| **xAI / xAI Corp** | The default global endpoint does not guarantee a region; a separate US endpoint exists | **Documented after enablement** | [Public xAI DPA](https://x.ai/legal/data-processing-addendum) | ZDR is self-serve at team level. API requests and responses are retained for 30 days by default; ZDR disables that retention and blocks stateful Responses, Files, Collections, Batch, Deferred completions and stored image/video outputs. |
| **Kimi / Moonshot AI PTE. LTD.** | The cited ZDR document does not specify a processing region | **Documented after approval; limited scope** | DPA not verified in the cited sources | Enterprise ZDR on request: prompts and responses are deleted after the request and enterprise data is not used for training. Direct image/video uploads, third-party connectors and operational data are outside ZDR. |

## EU providers

This is not a provider ranking. It maps product profiles against the selected criteria.

**OVHcloud, STACKIT and IONOS** provide straightforward standard inference profiles with European processing and different ZDR scopes. That does not mean every part of their portfolio is ZDR-eligible. Batch, Files, stateful collections or other APIs may have different rules.

**Scaleway** shows why a separate ZDR label can be imprecise in practice. If a provider retains a request after an error or suspected misuse, strict ZDR does not hold even under normal settings.

**Nebius** provides an explicit technical control, but the default behaviour is not ZDR. Here, configuration matters more than the product name.

**Mistral** demonstrates another boundary: ZDR may be available only after approval and only for selected stateless APIs. An "EU endpoint" also does not automatically mean EU member states only when the documentation includes EFTA or features that allow further processing.

## OpenAI, Anthropic and xAI

### OpenAI

**OpenAI is a different case, but for customers who qualify it is significant.** ZDR is not only a retention setting. It is an eligibility condition that enables the use of frontier models without standard prompt and response retention on supported endpoints. OpenAI first reviews the customer's request and then approves a specific organisation or project setup.

Under OpenAI's DPA, OpenAI Ireland Ltd. is the contracting party for customers domiciled in the EEA or Switzerland. This does not mean that all data is physically processed in Ireland. OpenAI uses the exact name **Europe (EEA + Switzerland)**, not “EU region”. ZDR applies only to supported endpoints and models; system metadata, certain features and unsupported models or endpoints have their own rules. The specific model, endpoint and feature must always be checked against the current ZDR table.

### Anthropic

**Anthropic** takes the opposite approach. According to the cited documentation, direct Claude API `inference_geo` values are `global` or `us`; EU inference is therefore not established. Regional options through a supported partner are a separate route that must be assessed independently. Claude API ZDR is enabled per organisation through sales. It does not automatically extend to every new organisation. Fable 5, Fable 5.1, Mythos 5 and Mythos 5.1 have 30-day retention and are not available under ZDR unless Anthropic expressly authorises an exception.

Anthropic therefore announced Enterprise Frontier Safeguards in September 2026. This is a proposed, progressively available architecture rather than general ZDR across Anthropic: the customer keeps monitoring data in its own infrastructure, automated systems send flags to its safety team, and Anthropic personnel do not access the content. Without EFS, eligible customers can use ZDR on Fable 5 and Fable 5.1.

Anthropic also states that flagged chat or session inputs and outputs may be retained for up to two years even under ZDR. This exception cannot be ignored.

### xAI

**xAI** also has self-serve ZDR, but it is enabled at team level. Every API key in the team must use ZDR; it cannot be enabled for only one key. ZDR blocks the stateful Responses API, Files, Collections, Batch, Deferred completions and stored image/video outputs. API requests and responses are retained for 30 days by default; ZDR disables that retention. The default global endpoint does not guarantee a processing region; a separate US endpoint exists, but has a narrower model and feature scope.

## Large Chinese models

Large Chinese models do not have one common answer:

- **Kimi / Moonshot AI** publishes ZDR for enterprise customers on request and does not retain prompts or responses after the request. The documentation does not specify a processing region, and ZDR does not cover direct image/video uploads, third-party connectors or operational logs. The DPA and processing region are not established in the cited sources.
- **DeepSeek** says in its public privacy policy that it processes data in China for its own services and may retain it while the account exists. The policy does not establish how customer data submitted through the API is handled. In this audit, its status is `unproven`, not a definitive FAIL. Disabling training use, where available, is not ZDR.
- **Qwen through Alibaba Cloud Model Studio** says it does not use customer data for training and encrypts it with AES-256. The documentation also says that Model Studio stores data generated by model and application calls. A Frankfurt endpoint and processing of all operations in the EU require a separate source; without one, EU residency is unproven.
- For MiniMax, I did not find sufficient official public evidence of a consistent ZDR, DPA and regional-processing posture. Missing evidence means the audit status is `unverified`, not confirmed ZDR.
- **Open-weight models** can run on infrastructure you control or through a European inference provider. With self-hosting, the data path can be controlled architecturally only when operations, storage, logs and subprocessors are also controlled. A first-party Chinese API is a different service from a European host running the same model.

This leads to an important distinction: **model origin and inference provider are not the same thing**. A large Chinese model can run in the EU with its own ZDR, while its direct API path may be in China without a suitable retention guarantee.

## How I would filter a provider

Not as a setup guide, but as an order of decision-making:

1. **Data.** First I distinguish data by type and sensitivity. Then I determine whether it is personal data or special categories of personal data under Article 9 GDPR. This determines the processing conditions, the required technical and organisational measures, and the boundaries to verify. Classification alone does not decide whether a provider can be used; the legal basis, contract and specific configuration also matter.
2. **Boundary.** I decide where the data may go and where it must remain. Private or sensitive data that must not leave my encrypted disk does not go to an inference service just because the provider promises ZDR.
3. **Endpoint.** I verify the specific endpoint, model and mode, not the brand. Stateless synchronous inference can have different properties from Batch, Files, Agents or stateful collections.
4. **Contract.** I review the DPA, processor role, retention exceptions, subprocessors and other important terms before using production data.
5. **Evidence.** I compare technical documentation, current configuration and the contract. A marketing label is not enough.

Public data can take a different path. It may intentionally remain in an ordinary cloud so that it is available, indexable and usable in search. That does not mean everything belongs in the cloud. Private data can remain on an encrypted disk, while inference for it is handled differently.

## ZDR, DPA and GDPR are not substitutes

A provider can offer ZDR but lack a suitable DPA, leaving the contractual framework required for processing missing. The legal basis is determined separately under Article 6 GDPR. A provider can have a DPA but retain data longer than necessary. It can have both and still receive data it should never receive.

Data sovereignty therefore does not end with choosing a "European" cloud. It emerges from the whole chain: data classification, processing location, technical retention, contractual responsibility and the way an organisation proves that these things are true.

The most important sentence in this audit is: **ZDR is not a general property of a provider. It is a property of a specific data path through a specific service.**

## Sources

Sources were verified on 24 September 2026. ZDR and regional options can change, so current documentation and the specific account should be checked before production use.

- [OVHcloud — AI Endpoints: Getting started](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started)
- [OVHcloud — Data Processing Agreement](https://us.ovhcloud.com/legal/data-processing-agreement)
- [STACKIT — AI Model Serving FAQ](https://docs.stackit.cloud/products/data-and-ai/ai-model-serving/faq)
- [STACKIT — Data Processing Agreement](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12)
- [STACKIT — AI Model Serving Service Certificate](https://stackit.com/en/asset/download/34346/file/Service_Certificate_STACKIT_AI_Model_Serving.pdf?version=10)
- [IONOS — AI Model Hub Data Handling](https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/data-handling)
- [IONOS — Data Processing Agreement](https://www.ionos.co.uk/terms-gtc/data-processing-agreement)
- [Scaleway — Generative APIs Privacy Policy](https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy.md)
- [Scaleway — Data Processing Agreement](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf)
- [Nebius — Legal Quick Guide](https://docs.tokenfactory.nebius.com/legal/legal-quick-guide)
- [Nebius — Data Processing Agreement](https://docs.tokenfactory.nebius.com/legal/dpa)
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
- [Kimi — Zero Data Retention](https://platform.kimi.ai/docs/guide/zero-data-retention)
- [Moonshot AI — Kimi OpenPlatform Terms of Service](https://platform.kimi.ai/docs/agreement/modeluse)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Alibaba Cloud Model Studio — Security certifications and privacy](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [EUR-Lex — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
