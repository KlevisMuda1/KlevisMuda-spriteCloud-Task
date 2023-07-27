export async function generateRandomEmail() {
    const email = `${Math.random().toString(36).substring(2, 11)}@gmail.com`
    return email
}
