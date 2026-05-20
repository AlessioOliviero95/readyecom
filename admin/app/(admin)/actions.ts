'use server';

import { revalidatePath } from 'next/cache';
import { writeConfig } from '@/lib/db';

export async function saveSiteConfig(value: unknown) {
  await writeConfig('site', value);
  revalidatePath('/', 'layout');
}

export async function saveNavigationConfig(value: unknown) {
  await writeConfig('navigation', value);
  revalidatePath('/', 'layout');
}

export async function saveProducts(value: unknown) {
  await writeConfig('products', value);
  revalidatePath('/', 'layout');
}
