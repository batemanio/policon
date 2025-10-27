import { getAvatarUrl } from "@/app/actions/getAvatarUrl";
import { ProfileClient } from "./ProfileClient";
import { createClient } from "@/utils/supabase/server";

export async function ProfileServer({ user_id }: { user_id: string }) {
    const supabase = await createClient();

    const { data: profile, error: firstError } = await supabase
        .from("profiles")
        .select()
        .eq("id", user_id);

    if (firstError) {
        console.log(firstError);
    }
    if (profile) {
        const avatar_url_profile = profile[0].avatar_url;
        const avatar_url = avatar_url_profile
            ? (await getAvatarUrl(avatar_url_profile)).content
            : "/no-avatar.png";

        console.log(avatar_url);

        const { data: visiting_user, error: secondError } =
            await supabase.auth.getUser();

        if (secondError) {
            console.log(secondError);
        }

        if (visiting_user.user) {
            const { data: followed, error: thirdError } = await supabase
                .from("follows")
                .select()
                .eq("following_user_id", visiting_user.user.id)
                .eq("followed_user_id", profile[0].id);

            if (thirdError) {
                console.log(thirdError);
            }

            const isFollowed = followed?.length ? true : false;

            return (
                <ProfileClient
                    initFollowing={isFollowed}
                    avatar_url={avatar_url}
                    profile={profile[0]}
                    user_id={user_id}
                />
            );
        } else {
            return (
                <ProfileClient
                    initFollowing={null}
                    avatar_url={avatar_url}
                    profile={profile[0]}
                    user_id={user_id}
                />
            );
        }
    }
}
