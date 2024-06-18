import Link from 'next/link'


export default function Nav() {
    return (
        <nav className="my-10">
            <ul className="flex">
                <li className="mx-10">
                    <Link href="/">Home</Link>
                </li>
                <li className="mx-10">
                    <Link href="/resources">Ressources</Link>
                </li>
                <li className="mx-10">
                    <Link href="/gears">Equipements</Link>
                </li>
                <li className="mx-10">
                    <Link href="/consumables">Consomables</Link>
                </li>
                <li className="mx-10">
                    <Link href="/shopping">Shopping</Link>
                </li>

            </ul>
        </nav>
    )

}