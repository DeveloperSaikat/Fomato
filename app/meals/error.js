'use client'; // this is required to client side errors thus NextJS forces to have it

export default function Error ({ error }) {
    return (
        <main className='error'>
            <h1>An error occurred!!</h1>
            <p>Failed to fetch the meal data. Please try again later.</p>
        </main>
    )
}