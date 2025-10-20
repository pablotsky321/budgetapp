'use client'

import { BillDTO } from "@/interfaces/BillDTO"
import { BillTypeDTO } from "@/interfaces/BillTypeDTO"

const baseURL = "http://localhost:8080"

export async function fetchBillTypes(userId: string, token: string) {
    const request = await fetch(`${baseURL}/billType/findByUserId/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await request.json()
    return data as BillTypeDTO[]
}

export async function fetchBills(userId: string, token: string) {
    const request = await fetch(`${baseURL}/bill/findByUser/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    const data = await request.json()
    return data as BillDTO[]
}

export async function createBillType(token: string, billType:BillTypeDTO){
    const request = await fetch(`${baseURL}/billType/create`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method:'post',
        body: JSON.stringify(billType)
    })
    const data = await request.json()
    return data as BillTypeDTO[]
}

export async function fetchBillTypeById(token: string, id: string){
    const request = await fetch(`${baseURL}/billType/findById/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    })
    const data = await request.json()
    return data as BillTypeDTO
}

export async function updateBillType(token: string, billType:BillTypeDTO, id:string){
    const request = await fetch(`${baseURL}/billType/update/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method:'PUT',
        body: JSON.stringify(billType)
    })
    const data = await request.json()
    return data as BillTypeDTO
}

export async function deleteBillType(token: string, id: string){
    const request = await fetch(`${baseURL}/billType/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method: 'DELETE'
    })
    const data = await request.text()
    return data
}

export async function createBill(token:string, billtypeId:string, bill: BillDTO){
    const request = await fetch(`${baseURL}/bill/create/${billtypeId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method:'post',
        body: JSON.stringify(bill)
    })
    const data = await request.json()
    return data as BillTypeDTO[]
}

export async function fetchBillById(token: string, id:string){
    const request = await fetch(`${baseURL}/bill/findById/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    })

    const data = await request.json()
    return data as BillDTO
}

export async function updateBill(token: string, billId:string, billtypeId:string, bill:BillDTO){
    const request = await fetch(`${baseURL}/bill/update?id=${billId}&billTypeId=${billtypeId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method:'PUT',
        body: JSON.stringify(bill)
    })

    const data = await request.json()
    return data as BillDTO
}

export async function deleteBill(token:string, id:string){
    const request = await fetch(`${baseURL}/bill/delete/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        method: 'DELETE'
    })
    const data = await request.text()
    return data
}