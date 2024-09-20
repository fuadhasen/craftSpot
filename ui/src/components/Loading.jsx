import './Loading.css';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <p className="font-semibold text-4xl text-gray-600">
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block">L</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.1s' }}>o</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.2s' }}>a</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.3s' }}>d</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.4s' }}>i</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.5s' }}>n</span>
                <span className="bg-stone-500 text-stone-50 fade-scale inline-block" style={{ animationDelay: '0.6s' }}>g</span>
            </p>
        </div>
    );
};

export default Loading;
