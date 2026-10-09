# Security Policy — RogueByte Cyber Lab

## Reporting Security Issues
At RogueByte, the security of our infrastructure and the legal isolation of our educational targets is of paramount importance.

If you discover a security vulnerability in RogueByte Cyber Lab (such as container breakout, authorization bypass, or secret leakage), please report it responsibly:

* **Lead Architect:** SID AHMED FARES (SidoDev-Dz)
* **Organization:** RogueByte
* **Security Channel:** Please create a Private Security Advisory via GitHub repository settings at [sidopac1a/roguebyte-cyber-lab](https://github.com/sidopac1a/roguebyte-cyber-lab) or [RogueByteOfficial](https://github.com/RogueByteOfficial).

### Policy & Scope
- **Do NOT** execute tests against public production instances or non-consenting third parties.
- All offensive testing must be confined strictly to designated lab sandboxes running on your local machine or an isolated testing server.
- Container targets in the platform are deliberately vulnerable for training purposes; vulnerabilities inside target containers are intended, whereas vulnerabilities in the host orchestrator, authentication layer, or network isolation bridge are considered critical flaws.
