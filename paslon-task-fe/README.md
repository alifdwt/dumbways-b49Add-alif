# PASLON FRONTEND

Repository ini diperuntukkan sebagai media dari task teman - teman Backend, silakan dicek terlebih dahulu tampilannya seperti apa

## Configuration API

Untuk link konfigurasi, bisa langsung arahkan ke:
src > config > api.ts

```ts {3} title=api.ts
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});
```

## List Task

> Get all Votes

(done)

> Get paslon data

(done)

> Get Partai data

(done)

> Create New Partai

- Axios
- useMutation
- Async

> Create New Paslon

- Axios
- useMutation
- Async

> Update Partai by ID

- Axios
- useQuery
- useMutation
- List and Keys
- Async

> Update Paslon by ID

- Axios
- useQuery
- useMutation
- List and Keys
- Async

> Delete Partai by ID

- Axios
- useQuery
- useMutation
- List and Keys
- Async

> Delete Paslon by ID

- Axios
- useQuery
- useMutation
- List and Keys
- Async

**NB:** Untuk UI kalian boleh berkreasi sesuka kalian, bebas pakai CSS Framework lain selain Chakra

## Panduan untuk menjalankan Backend secara lokal

```bash
go mod tidy
go mod download
go run main.go
```

== Yang dibutuhkan ==

XAMPP

langsung buat database baru dengan nama `backendmicrofeature`
