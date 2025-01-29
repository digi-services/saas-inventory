import { createClient } from '@supabase/supabase-js';

// Configura las variables de entorno con tus credenciales de Supabase
const supabaseUrl = 'https://jzvzlbhgvpxmmmavbzik.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dnpsYmhndnB4bW1tYXZiemlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjQ0MjYsImV4cCI6MjA1MzcwMDQyNn0.-j7sjhdLbl7LrsbStZ80IXxIMrHnD3DRvCFdt_fbzNk'

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);