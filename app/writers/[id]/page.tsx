import { Header } from "../../components/Header";

export default function Writers({ params }: any) {
    return (
        <>
            <Header />
            <p>You are looking at writer's {params?.id} page!</p>
        </>
    );
}
