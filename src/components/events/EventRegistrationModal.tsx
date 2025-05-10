
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EventRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (data: {
    eventName: string;
    fullName: string;
    email: string;
    phone: string;
  }) => void;
  eventName?: string;
}

export const EventRegistrationModal = ({ 
  open, 
  onClose, 
  onRegister,
  eventName = '' 
}: EventRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    eventName: eventName,
    fullName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
    // Reset form after submit
    setFormData({
      eventName: eventName,
      fullName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-orbitron">
            Event Registration
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event</Label>
            <Input
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="Event name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="Your email address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="Your phone number"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-glow-green text-black hover:bg-glow-green/80"
            >
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
