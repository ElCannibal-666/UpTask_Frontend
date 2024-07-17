import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, ProjectFormData, projectSchema } from "@/types/index";
import { isAxiosError } from "axios";
import { Project } from "@/types/index";

// Funcion para poder crear un proyecto en la parte del frontend
export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Funcion para poder obtener los proyectos en la parte del frontend
export async function getProjects() {
    try {
        const { data } = await api("/projects")
        const response = dashboardProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Funcion para poder encontrar un proyecto en la parte del fronted
export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProject(id: Project["_id"]) {
    try {
        const { data } = await api(`/projects/${id}`)
        const response = projectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Type que le hereda los props a la funcion de updateProject
type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

// Funcion para poder actualizar los proyectos en la parte del frontend
export async function updateProject({ formData, projectId }: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Funcion para poder eliminar un proyecto en la parte del frontend
export async function deleteProject(id: Project["_id"]) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}