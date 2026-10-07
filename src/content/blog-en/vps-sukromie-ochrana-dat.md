---
title: "Your own server on someone else's computer: privacy and data protection on a VPS"
description: "With a rented VPS, root access is only part of the story. How I distinguish technical access, contractual obligations and the copies that remain after a server is deleted."
pubDate: 2026-10-07
tags:
  - vps
  - cloud
  - data-sovereignty
  - gdpr
---

*Is my data on a VPS really mine alone?*

**TL;DR:** On a VPS you run your own system, but the infrastructure is controlled by the provider. Your data is therefore not automatically accessible only to you. Encryption helps, yet an encrypted disk by itself does not protect data in the memory of a running server. The contract determines what the provider may do; the technical design determines what it can reach. When choosing a VPS, what matters is the sensitivity of the data, the trustworthiness of the provider, and which copies and records remain after the service is cancelled.

## I have my own server. But what do I actually own?

I rent a VPS, install Linux and log in over SSH. I have root, I can install applications, set up a firewall and decide what runs on the server. It is natural to start calling it "my own server".

The VPS, however, runs on the provider's physical hardware. The provider also manages the virtualization layer — the hypervisor that allocates processor, memory and other resources to my server. Storage and the network remain under its control too.

Root gives me control inside the virtual server. The provider controls the environment in which that server runs.

**How much power does the person operating the physical hardware beneath my rented VPS have?**

## Is my data mine alone?

Three questions overlap when protecting data on a VPS. Each needs its own answer.

**Who can get to the data?** That depends on the technical design and access permissions. An unencrypted disk has different protection than an encrypted backup to which the provider has no key. Data in the memory of a running server is a separate question.

**What is the provider allowed to do with them?** Here the terms of service and legal obligations decide. Technical access does not by itself mean permission to read the content. Likewise, a contractual duty of confidentiality does not remove the technical ability to reach it.

**What remains stored, and for how long?** Besides the active disk, there can be snapshots, backups or operational records. Cancelling a VPS therefore does not necessarily mean the immediate removal of all related data.

These differences also matter when reading the claim "we do not access your data". Does it describe common practice? A contractual commitment? Or a technical design that makes access impossible? The same sentence can express very different levels of protection.

The provider's reputation also comes into play. Its business rests on customer trust, and unauthorized access to their data could mean losing clients, legal consequences and damage to its name. It thus has a business reason to protect their privacy. Reputational risk, however, does not by itself prevent an individual's failure, a security incident or access based on a legal requirement. It is another reason for trust, whose weight depends on the specific provider.

## What can a VPS provider see?

When we think about data on a VPS, we usually picture files and databases. The provider, however, can also have insight into network traffic and the data linked to our account. Each of these areas has different protection boundaries.

### Server content

On an unencrypted virtual disk, files are stored in readable form. A Linux password restricts logging into the system, but does not protect against someone who can read the storage itself. To obtain the contents of a copy of such a disk, my root password is not needed.

Content can also exist in backups and snapshots on the provider's infrastructure. Creating them does not require logging into my Linux — a copy of the virtual disk can be made at the storage level. So I also care about which copies the provider creates, who can access them, and how long they are kept.

Disk encryption protects stored data and its copies, unless the provider holds the decryption key. A separate question remains the memory of the running server, where applications work with readable data and keys. Under ordinary virtualization, the host layer is part of the environment I trust in this respect.

The scope of access also depends on the service. With a managed server, I may explicitly entrust system administration to the provider. With an unmanaged VPS I handle it myself, yet the provider's control over the infrastructure remains.

### Network traffic

HTTPS and SSH protect the content of communication in transit. The provider whose network the connection passes through, however, can see source and destination IP addresses, timing and the volume of transferred data. Even without reading content, this metadata can reveal a lot about how the server is used.

What matters is where the encrypted connection ends. If HTTPS terminates directly on my VPS, passing through a network DDoS protection does not make the readable content of requests accessible. If a intermediary service terminates the connection, for example a reverse proxy, that service processes the content and becomes another party I trust.

An encrypted transfer of a document to a VPS, moreover, protects only the journey. After arrival, the application can store and process the document in readable form.

### Customer data

The provider also holds the data I hand over at registration, payment or when contacting support. Depending on the service, it may keep billing details, login history or identity verification records.

These records exist independently of my server's content. Even if I stored only encrypted files on the VPS, the provider can know who owns the server, who pays for it and where I log in from.

**Content protection, traffic privacy and customer anonymity are three different things. Each must be assessed separately.**

## Encryption helps. What matters is where the keys and readable data are

"I have it encrypted" sounds like a complete answer. With a VPS, however, I need to know what exactly I am encrypting and against whom.

### In transit

HTTPS, SSH or a VPN protect the content of communication between the ends of the connection. Once the data arrives at the VPS, the application can decrypt it and keep working with it. Protection in transit ends there.

A VPN additionally moves part of the trust to the end of the tunnel. The VPS provider can still see that I communicate with this point, when and in what volume.

### At rest

Disk encryption, for example with LUKS, protects stored blocks. While the server runs, the underlying storage still holds an encrypted form of the data. Unlocking the disk lets the system read and write through the encryption layer; it does not rewrite the whole disk into readable form.

Copies made from the encrypted blocks are protected the same way. A backup created by copying files from inside the system, however, may contain already decrypted data. It therefore needs its own encryption.

It also matters who provides the encryption. If the provider encrypts the storage and also manages the keys, it protects me, for instance, when a physical disk is retired. This measure by itself still does not rule out its access to the content.

### In processing

If an application is to search a document, edit it or send it to a language model, it generally needs its readable content. That content appears in the server's memory. Disk encryption does not protect this memory.

A key stored outside the VPS does not automatically solve the whole problem either. If the server receives and uses the key for decryption during operation, at that moment it works with both the key and readable data.

The situation differs when I encrypt a file on my own computer and use the VPS only as storage. If I never give it the key, it does not need it to store the file. At the same time, it cannot search or process its content in the usual way.

**The decisive question is therefore: where does my data appear in readable form, and who controls that layer?**

### Can memory itself be protected from the provider?

With an ordinary VM, whoever controls the host layer can capture its memory and look for readable data or decryption keys. An encrypted disk does not block this path.

Technologies known as *confidential computing*, such as AMD SEV-SNP and Intel TDX, are designed to limit this possibility. The processor encrypts the virtual server's memory with hardware-managed keys and controls access to the protected environment. Applications inside still work with readable data, but the host software is not supposed to have direct access to it.

An important part of this is remote attestation — a cryptographically verifiable proof of the launched environment. An external service can check this proof and only then issue the decryption key. The customer does not have to rely solely on the provider's assurance that it switched the protection on.

This requires a supported processor, correct firmware and platform configuration, compatible virtualization software and running the VM in protected mode. If key release depends on attestation, I also need properly set up verification of its results. The mere statement "the server runs on AMD EPYC or Intel Xeon" is not enough.

This protection matters where I need to process sensitive data on someone else's infrastructure while limiting access by its administrators. Trust then shifts to the hardware, the security firmware and the software inside the VM. Vulnerabilities, application bugs or leaks through outputs remain possible paths to the data; availability of the server is still controlled by the provider.

**Confidential computing therefore cannot be assumed with an ordinary VPS. It must be a specific, correctly deployed and verifiable property of the service.**

## A European server, GDPR and a DPA: what do they actually tell me?

"Data stays in Europe" is useful information. By itself, however, it does not answer who can access the data and under what conditions.

When choosing a service, I need to distinguish the location of the data center, the company I conclude the contract with, and other parties involved in operating it. The server may physically stand in the EU while administration, support or some processing happens elsewhere. The jurisdiction of the provider and other involved companies can therefore be relevant too.

### What do GDPR and a DPA cover?

If I process customers' or employees' personal data on a VPS, GDPR obligations come into play. In a typical business scenario, I decide the purpose of processing, and the hosting provider acts as a processor when storing this data.

This relationship is governed by a data processing agreement, commonly called a DPA. It covers mainly processing instructions, confidentiality, security measures, involvement of sub-processors, assistance with incidents, and return or deletion of data after the service ends.

The provider may have different roles for different data. For the content of my customer database it may be a processor, while for the data it needs for its own billing it acts as a controller.

I need a properly concluded DPA. Its absence, however, does not switch off legal obligations automatically — it may mean that the required contractual framework is missing.

### Sidebar: data of a law firm

Imagine a law firm storing client files on a VPS or running an application that searches client documents. Among them are draft contracts, business plans, communication with clients and litigation strategy.

Under [Section 23 of the Slovak Act on Advocacy](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/586/20260817), the duty of confidentiality covers all facts an advocate learned in connection with practising law, apart from exceptions set by law. Its scope therefore exceeds personal data. Even a corporate client's document without a single name can contain information protected by confidentiality.

**A DPA is therefore not enough as an answer to protecting a complete client file.** I also need to know what confidentiality obligation covers its other content and the people who could access it.

With an ordinary VPS this problem becomes very concrete. If the application opens documents, their readable content is in the server's memory. If the disks are unencrypted, readable content can also be in their copies. Disk encryption helps protect stored blocks, but by itself does not remove access through the host layer during processing.

Before deployment, I need answers to specific questions:

- Can the provider's staff access disks or VM memory? Under what circumstances, with what approval and record-keeping?
- Does the confidentiality duty cover the entire content of client documents, or does the contract address only personal data?
- Who can access backups, where are they created and when are they deleted?
- How does the provider handle a request to hand over data, and when can it inform the firm?

The mere possibility of provider access does not yet prove a breach of confidentiality. It does mean that the label "our own server" is not a sufficient explanation of how client files are protected.

The Slovak Bar Association published recommendations for purchasing and using cloud services in the [Bulletin of Slovak Advocacy 10/2017](https://info.sak.sk/wp-content/uploads/2023/03/BSA_10_2017.pdf). It is an older document; it does not replace an assessment of today's specific service.

### Legal obligation and technical protection

GDPR and a DPA define duties and liability. They do not encrypt memory or create a technical barrier to access.

The legal framework still has practical value: it binds the provider, allows checking compliance and creates grounds for remedy or liability. Technical measures, in turn, can limit which data the provider can reach at all. The two layers complement each other.

A separate question is legal demands from authorities. The provider may be obliged to hand over certain data and, in some circumstances, may not inform the customer. The scope depends on the applicable law and the specific demand; the label "European hosting" does not rule this out.

**To protect data, I therefore need to know not only where the server stands, but who provides the service, who participates in operating it, and what obligations it has towards me.**

## I deleted my VPS. Did my data disappear too?

Clicking "delete server" removes one specific virtual machine. What happens to its disk, backups and other records depends on the service and its terms.

A snapshot can be a separate object that remains stored even after the server is deleted. Likewise, additional attached disks or backups with their own retention period may remain. When leaving, I therefore need to check all storages and copies I created or ordered.

### Cancelling the service and deleting data

Even removing a virtual disk does not necessarily mean its content is immediately overwritten on the physical medium. The storage system may first release the allocated space and ensure definitive removal by a further step. With a suitably designed encrypted storage, destroying the corresponding key can be part of such a process.

For the customer, the important answers are concrete: **What is deleted, within what period, by what method, and which copies does this process cover?**

Account details, invoices and security records have a separate life cycle. The provider may need to keep some of them even after the service ends, for example for legal obligations. Their retention must not be confused with the retention of server content.

### Copies created by my own operation

Further data may remain outside the VPS provider. I exported a database to a notebook, synced documents to another storage and sent backups to a different cloud. An error report may have captured the content of a request or part of a document.

Deleting the original server does not remove these copies.

A problem can also arise during restoration: I delete a document from the application, but restoring an older backup brings it back. If I need to ensure its removal, I must know how deletion propagates into backups and any restore.

**Control over data includes knowing where copies are created and when they cease to exist. The "delete VPS" button alone does not provide this overview.**

## What belongs on a VPS, then?

The decision starts with what I want to do on the server and what consequences unauthorized access to the data by another person would have.

For a public website, most content is meant to be published. I still need to protect admin access, credentials and any data from forms. Public content does not mean there is nothing confidential on the server.

For a business application, the VPS may hold customer data, orders or internal documents. Here, provider choice, terms of service and security belong to the decision about whom I entrust this information to.

For a backup storage, I can shift the boundary of trust substantially: I encrypt the data before sending and keep the decryption key off the VPS. The server then keeps copies whose content it does not need to know.

Processing sensitive documents is harder. If an application or language model on the VPS needs to read them, I must count on their readable form during processing. Depending on the required protection, I can choose a trustworthy provider with adequate commitments, a verifiable confidential computing environment, or processing on my own infrastructure — which I must then also know how to operate securely.

### Before deployment, I ask five questions

- **What data am I sending there?** Does the application need the whole document, or only a selected part?
- **Where does it appear in readable form?** On my device, on the VPS, or also in another service?
- **Whom am I trusting with this?** The infrastructure provider, the application operator and any other vendors?
- **Which copies are created?** On disks, in backups, logs and monitoring?
- **How do I leave?** Can I move the data, remove remaining copies and revoke access credentials?

A VPS can give me a lot of freedom: I choose the software, administer the system and decide about operations. With this control I also take on responsibility for updates, access, applications and backups.

**My data on a VPS can be well protected. But I need to know which protection I provide, which the provider provides, and where I still have to trust it.**

In the next article we will look at specific providers. We will ask the same questions of their documentation and terms of service: what do they guarantee, what do they explain, and what remains unanswered.
