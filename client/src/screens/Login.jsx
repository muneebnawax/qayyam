import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard'); // Move warden to their dashboard
            } else {
                setError(data.error || 'Login failed. Invalid credentials.');
            }
        } catch (err) {
            setError(err.message || 'Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            <Navbar />
            <main className="pt-32 pb-16 px-6 max-w-md mx-auto">
                <div className="bg-surface-container-lowest p-8 rounded-[2rem] editorial-shadow text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-on-surface mb-2">Welcome Back</h1>
                    <p className="text-on-surface-variant font-medium mb-8 text-sm">Sign in to manage your Qayam properties.</p>

                    {error && <div className="mb-6 p-4 bg-error/10 text-error text-xs font-bold rounded-xl">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    className="w-full bg-surface-container-low border-0 pl-12 pr-4 py-4 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="warden@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    className="w-full bg-surface-container-low border-0 pl-12 pr-4 py-4 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors active:scale-95 flex items-center justify-center gap-2 mt-4">
                            {loading ? 'Authenticating...' : (
                                <>Sign In Securely <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-on-surface-variant font-medium">
                        Don't have a warden account?{' '}
                        <Link to="/signup" className="text-primary font-bold hover:underline">Apply Now</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
