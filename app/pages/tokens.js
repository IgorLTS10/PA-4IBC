import Footer from '../components/Footer';
import Header from '../components/Header';
import TokenList from '../components/TokenList';

export default function TokensPage() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-[#2D242F]'>
            <Header />
            <TokenList />
            <Footer />
        </div>
    );
}
