export async function downloadImage(path: string, supabase: any) {
    try {
        const { data, error } = await supabase.storage
            .from("avatars")
            .download(path);
        if (error) {
            throw error;
        }

        const url = URL.createObjectURL(data);
        return url;
    } catch (error) {
        console.log("Error downloading image: ", error);
    }
}
