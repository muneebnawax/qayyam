import React, { useState, useEffect } from 'react';
import { Building2, CloudUpload, Check, X, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const AMENITIES_LIST = ['WiFi', 'AC', 'Geyser', 'Laundry', 'Parking', 'Kitchen', 'Mess', 'UPS/Generator', 'CCTV', 'Study Room'];

export default function HostelForm({ editingId, initialData, onSuccess, onCancel }) {
  const [hostelType, setHostelType] = useState('Boys');
  const [furnished, setFurnished] = useState('Furnished');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [rooms, setRooms] = useState('');
  const [description, setDescription] = useState('');
  
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imagesBase64, setImagesBase64] = useState([]);
  
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setHostelType(initialData.gender || 'Boys');
      setFurnished(initialData.furnished || 'Furnished');
      setContactNumber(initialData.contactNumber || '');
      setCity(initialData.city || '');
      setArea(initialData.area || initialData.location || '');
      setAddress(initialData.address || '');
      setRent(initialData.price ? initialData.price.toString() : '');
      setRooms(initialData.capacity ? initialData.capacity.toString() : '');
      setDescription(initialData.description || '');
      setLat(initialData.coordinates?.lat ? initialData.coordinates.lat.toString() : '');
      setLng(initialData.coordinates?.lng ? initialData.coordinates.lng.toString() : '');
      setSelectedAmenities(initialData.amenities || []);
      
      const loadedImages = [];
      if (initialData.image && !initialData.image.includes('placeholder')) loadedImages.push(initialData.image);
      if (initialData.images && Array.isArray(initialData.images)) {
        initialData.images.forEach(img => {
          if (!loadedImages.includes(img) && !img.includes('placeholder')) loadedImages.push(img);
        });
      }
      setImagesBase64(loadedImages);
    }
  }, [initialData]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (imagesBase64.length + files.length > 8) {
      alert("You can only upload a maximum of 8 images.");
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is larger than the 2MB limit and will be skipped.`);
        return false;
      }
      return true;
    });

    try {
      const base64Promises = validFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const newBase64Images = await Promise.all(base64Promises);
      setImagesBase64(prev => [...prev, ...newBase64Images].slice(0, 8));
    } catch (err) {
      alert("Error processing images.");
      console.error(err);
    }
  };

  const removeImage = (index) => {
    setImagesBase64(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await res.json();
      if (!meData.success) throw new Error('Not authorized');

      const wardenName = meData.data.name;

      let parsedLat = parseFloat(lat);
      let parsedLng = parseFloat(lng);
      const coordinates = (!isNaN(parsedLat) && !isNaN(parsedLng)) 
        ? { lat: parsedLat, lng: parsedLng } 
        : undefined;

      const payload = {
        name,
        gender: hostelType,
        furnished,
        contactNumber,
        city,
        area,
        address,
        description,
        location: area || city,
        capacity: parseInt(rooms) || 0,
        price: rent,
        wardenName,
        amenities: selectedAmenities,
        coordinates,
        image: imagesBase64.length > 0 ? imagesBase64[0] : 'https://via.placeholder.com/400x300',
        images: imagesBase64
      };

      const url = editingId 
        ? `http://localhost:5000/api/hostels/${editingId}`
        : 'http://localhost:5000/api/hostels';
        
      const method = editingId ? 'PUT' : 'POST';

      const actionRes = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const addData = await actionRes.json();
      if (addData.success) {
        onSuccess();
      } else {
        setMessage(addData.error || 'Failed to save hostel');
      }
    } catch (err) {
      setMessage(err.message || 'Error executing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight text-on-surface">
          {editingId ? 'Edit Hostel Listing' : 'Add New Hostel'}
        </h3>
        {onCancel && (
          <button onClick={onCancel} type="button" className="text-xs flex items-center gap-1 font-bold text-error bg-error/10 px-3 py-1.5 rounded-full">
            <X className="w-3 h-3"/> Cancel
          </button>
        )}
      </div>
      
      {message && <div className="mb-4 p-3 bg-secondary text-white text-xs font-bold rounded-lg">{message}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Pin Location UI */}
        <div className="space-y-2 bg-surface-container-low/50 p-4 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-tertiary w-4 h-4" />
            <label className="text-xs font-bold uppercase tracking-wider text-secondary">Pin Location (Map View)</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input value={lat} onChange={e => setLat(e.target.value)} className="w-full bg-white border border-surface-container-high rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-xs" placeholder="Latitude e.g. 34.0150" type="number" step="any" />
            <input value={lng} onChange={e => setLng(e.target.value)} className="w-full bg-white border border-surface-container-high rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-xs" placeholder="Longitude e.g. 71.5805" type="number" step="any" />
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium mt-1">Provide exact coordinates so students can locate your property on the map view.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Type*</label>
            <select value={hostelType} onChange={e => setHostelType(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Furnished*</label>
            <select value={furnished} onChange={e => setFurnished(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option value="Furnished">Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Name*</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-50" placeholder="e.g. Al-Noor Boys Hostel" type="text" />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Contact Number*</label>
          <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 03xx xxxxxxx" type="text" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">City*</label>
            <input value={city} onChange={e => setCity(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="City" type="text" />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Area*</label>
            <input value={area} onChange={e => setArea(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Hayatabad Phase 3" type="text" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Full Address*</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} required className="w-full min-h-[80px] bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-y" placeholder="Complete street address..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Monthly Rent per Bed (PKR)*</label>
            <input value={rent} onChange={e => setRent(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 8000" type="number" />
            <p className="text-[10px] text-on-surface-variant italic">This will be shown as the starting price on your listing</p>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Total Beds Available*</label>
            <input value={rooms} onChange={e => setRooms(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="40" type="number" />
          </div>
        </div>
        
        <div className="space-y-2 border-t border-surface-container-high pt-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES_LIST.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5",
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-transparent border-surface-container-high text-on-surface-variant hover:border-primary/50"
                  )}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full min-h-[100px] bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-y" placeholder="Any additional information about rules, nearby spots, meals..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Images (Max 8, 2MB each)</label>
          <label className={cn("relative w-full aspect-video bg-surface-container overflow-hidden rounded-xl border-2 border-dashed border-on-surface-variant/20 flex flex-col items-center justify-center gap-3 transition-colors group", imagesBase64.length >= 8 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-surface-container-high")}>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              className="hidden" 
              disabled={imagesBase64.length >= 8}
              onChange={handleImageUpload}
            />
            {imagesBase64.length === 0 ? (
              <>
                <CloudUpload className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors" />
                <p className="text-xs font-medium text-on-surface-variant">Click to upload up to 8 images</p>
                <p className="text-[10px] text-on-surface-variant/50">JPG, PNG strictly up to 2MB per image</p>
              </>
            ) : (
              <div className="absolute inset-0 p-4">
                <div className="flex flex-col items-center justify-center w-full h-full border border-dashed border-primary/30 rounded-lg bg-primary/5">
                   <CloudUpload className="w-8 h-8 text-primary/60 mb-2" />
                   <span className="text-xs font-bold text-primary">Upload More Images ({imagesBase64.length}/8)</span>
                </div>
              </div>
            )}
          </label>
          
          {imagesBase64.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imagesBase64.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-surface-container-high group">
                  <img src={img} alt={`Preview ${idx+1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] font-bold text-center py-1 uppercase tracking-widest">Primary</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button disabled={loading} className="w-full bg-tertiary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all mt-4 shadow-lg shadow-tertiary/20 flex justify-center items-center" type="submit">
          {loading ? 'Submitting...' : (editingId ? 'Update Listing Details' : 'Upload Hostel Listing')}
        </button>
      </form>
    </div>
  );
}
