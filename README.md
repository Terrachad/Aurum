![Aurum-rounded-git](https://github.com/user-attachments/assets/d20717fb-5e62-47ff-a3dc-0bff34eec878)


# 📋 Table of Contents
* 🚀 [Introduction](#introduction)
* ⚙️ [Tech Stack](#tech-stack)
* 🔋 [Features](#features)
* 🤸 [Quick Start](#quick-start)

# 🚀 Introduction
<a name="introduction"></a>
Aurum is a powerful financial SaaS platform built with Next.js that enables users to connect multiple bank accounts, view real-time transactions, transfer money between users, and comprehensively manage their finances in one place.

# ⚙️ Tech Stack
<a name="tech-stack"></a>
* Next.js
* TypeScript
* Appwrite
* Plaid
* Dwolla
* React Hook Form
* Zod
* TailwindCSS
* Chart.js
* ShadCN

# 🔋 Features
<a name="features"></a>
## ✨ Comprehensive Financial Management
### 🔐 Secure Authentication
Enterprise-grade SSR authentication with robust validation and authorization protocols.

### 🏦 Banking Integration
#### 🔄 Multi-Bank Connection
Connect and manage multiple bank accounts seamlessly through Plaid integration.

#### 📊 Account Overview
* Total balance across all connected accounts
* Recent transaction history
* Category-wise spending analysis
* Real-time account updates

### 💳 Transaction Management
#### 📱 Complete Visibility
* Comprehensive transaction history
* Advanced filtering options
* Pagination for better organization
* Real-time transaction updates

### 💸 Money Transfer
#### 🔄 Secure Transfers
* User-to-user fund transfers via Dwolla
* Secure recipient verification
* Detailed transfer history
* Real-time transfer status updates

### 📱 Platform Accessibility
#### 🖥️ Universal Access
Responsive design ensuring seamless experience across desktop, tablet, and mobile devices.

# 🤸 Quick Start
<a name="quick-start"></a>
Follow these steps to set up the project locally on your machine.

## Prerequisites
Make sure you have the following installed on your machine:
* Git
* Node.js
* npm (Node Package Manager)

## Cloning the Repository
```bash
git clone https://github.com/adrianhajdin/banking.git
```

## Installation
Install the project dependencies using npm:
```bash
npm install
```

## Set Up Environment Variables
Create a new file named `.env` in the root of your project and add the following content:
```env
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

Replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the Appwrite, Plaid and Dwolla websites.

## Running the Project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
