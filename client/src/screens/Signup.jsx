import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, KeyRound, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard'); // Take to dashboard after registration
            } else {
                setError(data.error || 'Registration failed. Try again.');
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
                    <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-tertiary">
                        <KeyRound className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-on-surface mb-2">Partner with Qayam</h1>
                    <p className="text-on-surface-variant font-medium mb-8 text-sm">Register your warden account to list and manage hostels.</p>

                    {error && <div className="mb-6 p-4 bg-error/10 text-error text-xs font-bold rounded-xl">{error}</div>}

                    <form onSubmit={handleSignup} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full bg-surface-container-low border-0 pl-12 pr-4 py-4 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="Ijaz Ali"
                                />
                            </div>
                        </div>

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
                                    minLength={6}
                                    className="w-full bg-surface-container-low border-0 pl-12 pr-4 py-4 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="At least 6 characters"
                                />
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="w-full bg-tertiary hover:bg-tertiary-container text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors active:scale-95 flex items-center justify-center gap-2 mt-4">
                            {loading ? 'Creating Account...' : (
                                <>Register Account <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-on-surface-variant font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">Sign In Instead</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
