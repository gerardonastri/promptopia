import '@styles/global.css' //con @ possiamo andare alla cartella
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'


export const metadata = {
    tile: "Promptopia",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout