# 📜 VERITAS | On-Chain Reputation Protocol
### *Authentic Reviews. Certified by Polkadot Asset Hub.*

![Polkadot](https://img.shields.io/badge/Polkadot-E2007A?style=for-the-badge&logo=polkadot&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Network](https://img.shields.io/badge/Network-Paseo_Asset_Hub-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Veritas** è un protocollo decentralizzato progettato per eliminare le recensioni false. Grazie alla potenza della blockchain **Paseo Asset Hub**, ogni feedback è collegato matematicamente a una transazione reale (ricevuta), creando un ecosistema di fiducia immutabile per commercianti e clienti.

---

## 🌟 Caratteristiche Principali

* ✅ **Proof of Purchase**: Solo chi ha scansionato un QR Code generato dal commerciante può lasciare una recensione.
* 🛡️ **Anti-Falsificazione**: Ogni ricevuta può essere usata una sola volta (prevenzione dello spam).
* 🌓 **Interfaccia Moderna**: Design pulito stile Google con supporto nativo alla **Dark Mode**.
* ⛓️ **100% On-Chain**: I dati non risiedono su un database privato, ma sono pubblici e verificabili su Polkadot.

---

## 🏗️ Architettura del Sistema

Il protocollo si basa su un unico Smart Contract "Hub" che gestisce molteplici attività commerciali senza la necessità di deploy multipli.



1. **Merchant Registration**: Il commerciante registra il suo indirizzo come "Business" ufficiale.
2. **QR Generation**: Viene generato un link univoco contenente l'ID della ricevuta.
3. **Verification**: Lo Smart Contract verifica che il negozio sia attivo e che la ricevuta sia valida.
4. **Indexing**: Il frontend scansiona gli eventi blockchain per calcolare il rating medio e mostrare i commenti.

---

## 🛠️ Dettagli Tecnici

### Smart Contract
| Parametro | Valore |
| :--- | :--- |
| **Contract Address** | `0x4cb4f27090ab3b07c0faadddcb8ca473db9e05f7` |
| **Network** | Paseo Asset Hub (Polkadot Testnet) |
| **Chain ID** | `424` |
| **Explorer** | [Statescan - Paseo Asset Hub](https://paseo-asset-hub.statescan.io/) |

### Struttura del Progetto
* `/veritas/index.html`: Portale di ricerca e landing page.
* `/veritas/dashboard.html`: Pannello di controllo per commercianti (Login/QR).
* `/veritas/review.html`: Interfaccia cliente per l'invio delle recensioni.
* `/veritas/store.html`: Profilo pubblico con media voti e commenti storici.
* `/veritas/app.js`: Logica Web3 (Ethers.js) e gestione temi.
* `/veritas/style.css`: Stile centralizzato Google Material Design.

---

## 🚀 Come Iniziare

### 1. Requisiti
* Un wallet **MetaMask** configurato sulla rete Paseo Asset Hub.
* Token **PAS** (Paseo) ottenibili dal [Faucet Ufficiale](https://faucet.polkadot.io/).

### 2. Configurazione Rete (Custom RPC)
* **RPC URL**: `https://paseo-asset-hub-rpc.polkadot.io`
* **Chain ID**: `424`
* **Currency Symbol**: `PAS`

### 3. Installazione Locale
```bash
# Clona il repository
git clone [https://github.com/tuo-username/veritas-protocol.git](https://github.com/tuo-username/veritas-protocol.git)

# Entra nella cartella
cd veritas

# Apri index.html con un server locale (es. Live Server di VS Code)

📜 Licenza
Distribuito sotto Licenza MIT.

Developed for the Polkadot Web3 Ecosystem.
