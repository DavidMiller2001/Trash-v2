export default function Page({ params }: { params: { slug: string } }) {
        const { slug } = params;
        return <div>post id: {slug}</div>
}
