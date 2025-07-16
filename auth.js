// Authentication

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://whmlpoxodlbtbfbitvxh.supabase.co'
const SUPABASE_KEY = "sb_publishable_2JaIl9xJY-RVuQeNuuW-2Q_liqOwqhd"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

// Redirect if already logged in
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) window.location.href = "dashboard.html";
});

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    const msg = document.getElementById('message');
    if (error) {
        msg.textContent = "Login failed: " + error.message;
        msg.style.color = "red";
    } else {
        msg.textContent = "Login successful!";
        msg.style.color = "lime";
        window.location.href = "dashboard.html";
    }
}