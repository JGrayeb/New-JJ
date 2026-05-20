@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "DM Sans", sans-serif;
  overflow-x: clip;
}

html {
  scroll-behavior: smooth;
}

@layer base {
  :root {
    --background: 0 0% 5%;
    --foreground: 0 0% 100%;
    
    --primary: 355 60% 35%;
    --primary-dark: 355 60% 20%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 0 5% 75%;
    --secondary-foreground: 0 0% 5%;
    
    --muted: 0 0% 12%;
    --muted-foreground: 0 0% 75%;
    
    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 100%;
    
    --card: 0 0% 8%;
    --card-foreground: 0 0% 100%;
    
    --popover: 0 0% 8%;
    --popover-foreground: 0 0% 100%;
    
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 355 60% 35%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    
    --radius: 0.75rem;
    
    --sidebar-background: 0 0% 8%;
    --sidebar-foreground: 0 0% 100%;
    --sidebar-primary: 355 60% 35%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 15%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 0 0% 20%;
    --sidebar-ring: 355 60% 35%;

    /* Brand Logo Colors - Note: 353 70% 28% is the true HSL for #7A1520 */
    --burgundy: 353 70% 28%;
    --white: 0 0% 100%;
  }
}

@layer components {
  .jj-studio-logo {
    font-family: 'Playfair Display', serif;
    display: inline-flex;
    align-items: baseline;
    line-height: 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}