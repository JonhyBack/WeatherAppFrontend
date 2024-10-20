import './Container.css';

interface ContainerProps {
    children: React.ReactNode;
    maxWidth?: string;
    padding?: string;
}

function Container({ children, maxWidth = '1200px', padding = '20px' }: ContainerProps) {
    return (
        <main className="container" style={{ maxWidth, padding }}>
            {children}
        </main>
    );
};

export default Container;