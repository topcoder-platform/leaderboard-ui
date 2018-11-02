import Link from 'next/link'

export default () => (
    <div>
        Home &nbsp;&nbsp;
        <Link as={`/home`} href={`/content/home`}>
                <a>here</a>
            </Link>
        <br />
        Messages &nbsp;&nbsp;
        <Link as={`/message`} href={`/content/message`}>
                <a>here</a>
            </Link>
        <br />
        Winners &nbsp;&nbsp;
        <Link as={`/winners`} href={`/content/winners`}>
                <a>here</a>
            </Link>
        <br />
        Finalists &nbsp;&nbsp;
        <Link as={`/finalists`} href={`/content/finalists`}>
                <a>here</a>
            </Link>
        <br />
        Finalist-details &nbsp;&nbsp;
        <Link as={`/finalist-details`} href={`/content/finalist-details`}>
                <a>here</a>
            </Link>
        <br />
        Countdown-timer &nbsp;&nbsp;
        <Link as={`/countdown-timer`} href={`/content/countdown-timer`}>
                <a>here</a>
            </Link>
    </div>
)