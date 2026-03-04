"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Profile Actions ---
export async function getProfile() {
  try {
    return await prisma.profile.findFirst();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function updateProfile(data) {
  try {
    const profile = await prisma.profile.findFirst();
    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data,
      });
    } else {
      await prisma.profile.create({ data });
    }
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
}

// --- Project Actions ---
export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function addProject(data) {
  try {
    await prisma.project.create({ data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(id, data) {
  try {
    await prisma.project.update({ where: { id }, data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
}

// --- Experience Actions ---
export async function getExperience() {
  try {
    return await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function addExperience(data) {
  try {
    await prisma.experience.create({ data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding experience:", error);
    return { success: false, error: error.message };
  }
}

export async function updateExperience(id, data) {
  try {
    await prisma.experience.update({ where: { id }, data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteExperience(id) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return { success: false, error: error.message };
  }
}

// --- Skill Actions ---
export async function getSkills() {
  try {
    return await prisma.skill.findMany();
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function addSkill(data) {
  try {
    await prisma.skill.create({ data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding skill:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSkill(id) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, error: error.message };
  }
}

// --- Message Actions ---
export async function addMessage(data) {
  try {
    await prisma.message.create({ data });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding message:", error);
    return { success: false, error: error.message };
  }
}

export async function getMessages() {
  try {
    return await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function deleteMessage(id) {
  try {
    await prisma.message.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: error.message };
  }
}

// --- Auth Actions ---
export async function validateAdmin(username, password) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if (admin && admin.password === password) {
      return { success: true };
    }
    return { success: false, error: "Invalid username or password" };
  } catch (error) {
    console.error("Error validating admin:", error);
    return { success: false, error: "Authentication failed" };
  }
}
