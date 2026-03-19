# Product Context: Next.js Starter Template

## Why This Template Exists

Starting a new Next.js project involves boilerplate setup, configuration decisions, and establishing patterns. This template provides a clean, opinionated starting point that eliminates setup friction and establishes best practices from the start. It's optimized for AI-assisted development, where an AI can quickly extend the template based on user requirements.

## Problems It Solves

1. **Setup Time**: Eliminates boilerplate configuration (TypeScript, Tailwind, ESLint)
2. **Decision Fatigue**: Pre-made choices for tooling and patterns
3. **AI Context**: Memory bank provides persistent context for AI assistants
4. **Extensibility**: Recipe system for adding common features
5. **Consistency**: Standardized project structure and conventions

## How It Should Work (User Flow)

1. User starts with this template
2. User describes what they want to build to AI assistant
3. AI adds pages, components, and features as needed
4. AI uses recipes for common additions (database, auth)
5. User previews changes via hot reload
6. Iterate until satisfied
7. Deploy

## Key User Experience Goals

- **Zero to Feature Fast**: Get building immediately, no setup required
- **AI-Friendly**: Memory bank and recipes make AI assistance effective
- **Flexible Foundation**: Can become any type of application
- **Best Practices Built-In**: TypeScript strict mode, ESLint, clean structure

## What This Template Provides

1. **Clean App Structure**: Single page ready for expansion
2. **Type Safety**: Full TypeScript setup with strict mode
3. **Modern Styling**: Tailwind CSS 4 ready to use
4. **Code Quality**: ESLint configured
5. **Extensibility**: Recipe system for common features

## Integration Points

- **Database**: Use add-database recipe for Drizzle + SQLite
- **Styling**: Tailwind CSS pre-configured
- **AI Assistance**: Memory bank for context persistence


## Data-Driven Product Strategy

- Calculabs is not just a calculator platform. It is a data-driven system designed to acquire traffic, understand user behavior, and maximize monetization.

### Core Objective

- Generate high-volume organic traffic via SEO

- Capture user behavior through tracking

- Optimize pages based on real usage data

- Monetize through ads and affiliate offers

### User Intent Model

- Each calculator represents a different level of user intent:

Informational → user is learning

- Practical → user wants to calculate something

Commercial → user is comparing options

- Transactional → user is ready to decide

### Page Value Hierarchy

- Not all pages have the same value.

- High-value pages:

- Financing calculators

- Investment simulators

- ROI / ROAS

- Retirement simulations

- Low-value pages:

- Basic math (MMC, MDC)

- Simple converters

### Monetization Strategy

- Top Funnel (Informational)

- Focus: traffic

- Monetization: light AdSense

- Middle Funnel (Practical)

- Focus: engagement

- Monetization: optimized AdSense

- Bottom Funnel (Commercial / Transactional)

- Focus: conversion

- Monetization:

- Affiliate links

- Hybrid (ads + affiliate)

- Product Evolution Model

- Each calculator should evolve in 3 stages:

- Calculation (basic tool)

- Simulation (advanced scenarios)

- Recommendation (decision support)

### Data Feedback Loop

- User interaction generates data:
→ Data is collected via tracking
→ Data is stored (future: Supabase)
→ Data is analyzed
→ Product is optimized

### Strategic Principle

- Every page must evolve from a simple calculator into a decision-making tool.

- The goal is not just usage, but influence over user decisions.
