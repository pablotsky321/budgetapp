import { BillDTO } from "@/interfaces/BillDTO"

const baseURL = "localhost:8080/bill"
const userId = localStorage.getItem("userId")

export async function fetchBills(){
    const request = await fetch(`${baseURL}/findByUser/${userId}`)
    const data = await request.json()
    return data as BillDTO[]
}
