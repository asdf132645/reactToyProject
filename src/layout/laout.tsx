import { LayoutProps } from '../common/lib/type/layout';
import { Header } from '../components/layout/Header';

export const Layout = ({
                           HeaderContents,
                       }: LayoutProps) => {

    return (
        <>
            <div id='wrapper'>
                <Header
                    HeaderContents={HeaderContents}
                />
                <main>

                </main>
            </div>
        </>
    );
};
