import { HeaderProps } from '../../common/lib/type/header';

export const Header = ({  HeaderContents }: HeaderProps) => {
    return (
        <header>
            <div>
                <button
                    type='button'
                >
                    <i></i>
                </button>
            </div>
            {HeaderContents}
        </header>
    );
};
