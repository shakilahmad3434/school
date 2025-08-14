import { useContext, useEffect, useState } from "react";
import Form, { type FormDataType } from "../../../components/common/Form";
import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/Textarea";
import Button from "../../../components/common/Button";
import AuthContext from "../../../context/AuthContext";
import CatchError from "../../../utils/error";
import { v4 as uuid } from "uuid";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import moment from "moment";

interface FormDataInterface {
    _id?: string;
    schoolName?: string;
    directorName?: string;
    estd?: string;
    regNo?: string;
    email?: string;
    mobile?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    website?: string;
    tagline?: string;
}

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const { session, setSession } = useContext(AuthContext);
    const [logo, setLogo] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [lastImagePath, setLastImagePath] = useState<string>("");

    useEffect(() => {
        if (session) {
            setFormData(session);
            if (session.image && session.image !== lastImagePath && !session.image.startsWith('http')) {
                fetchImageUrl();
            }
        }
    }, [session]);

    // update settings
    const handleSettings = async (values: FormDataType) => {
        setLoading(true);
        try {
            if (!logo) {
                const { data } = await HttpInterceptor.post(`/auth/settings/${session.id}`, values);
                toast.success(data.message);

                setSession({ ...session, ...values });
            } else {
                const path = `profile-pictures/${uuid()}.${
                    logo.name.split(".").pop()?.toLowerCase() || "png"
                }`;
                const payload = {
                    path,
                    type: logo.type,
                };

                const option = {
                    headers: {
                        "Content-Type": logo.type,
                    },
                };
                
                // Upload image first
                const { data: uploadData } = await HttpInterceptor.post("/storage/upload", payload);
                await HttpInterceptor.put(uploadData.url, logo, option);
            
                const { data: settingRes } = await HttpInterceptor.post(
                    `/auth/settings/${session.id}`, 
                    { ...values, image: path }
                );
                
                toast.success(settingRes.message);
                
                setSession({ ...session, ...values, image: path });
                setLogo(null);
            }
        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    // fetch signed url
    const fetchImageUrl = async () => {
        if (!session?.image || session.image.startsWith('http')) return;
        
        try {
            const { data: url } = await HttpInterceptor.post('/auth/image-url', { image: session.image });
            setLastImagePath(session.image);
            setSession({ ...session, image: url });
        } catch (error) {
            console.error("Error fetching image URL:", error);
        }
    };

    const handleUploadClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png, image/jpeg";

        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                setLogo(target.files[0]);
            }
            document.body.removeChild(input);
        };

        document.body.appendChild(input);
        input.click();
    };

    // Handle form data changes
    const handleFormDataChange = (field: keyof FormDataInterface, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Format date for input
    const formatDateForInput = (dateString?: string) => {
        if (!dateString) return "";
        try {
            return moment(dateString).format('YYYY-MM-DD');
        } catch {
            return "";
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden">
                            <img
                                src={session?.image || "/school.png"}
                                alt="school logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                {session?.schoolName || "School Name"}
                            </h2>
                            <p className="text-gray-600 mt-1 capitalize">
                                {session?.tagline || "Tagline missing"}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                    <i className="ri-calendar-line"></i>
                                    Est. {session?.estd ? moment(session.estd).format('YYYY') : "2025"}
                                </span>
                                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                    <i className="ri-global-line"></i>
                                    {session?.website || "https://www.yourschool.com"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Active</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                            School Information
                        </h3>
                    </div>

                    <Form onValue={handleSettings}>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <Label htmlFor="schoolName" required>
                                        School Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="schoolName"
                                        placeholder="Enter school name"
                                        id="schoolName"
                                        value={formData.schoolName || ""}
                                        onChange={(e) => handleFormDataChange('schoolName', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="directorName" required>
                                        Director's Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="directorName"
                                        placeholder="Enter director's name"
                                        id="directorName"
                                        required
                                        value={formData.directorName || ""}
                                        onChange={(e) => handleFormDataChange('directorName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <Label htmlFor="estd">Established Year</Label>
                                    <Input
                                        type="date"
                                        name="estd"
                                        id="estd"
                                        value={formatDateForInput(formData.estd)}
                                        onChange={(e) => handleFormDataChange('estd', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="regNo">Registration Number</Label>
                                    <Input
                                        type="text"
                                        name="regNo"
                                        id="regNo"
                                        placeholder="Enter registration number"
                                        value={formData.regNo || ""}
                                        onChange={(e) => handleFormDataChange('regNo', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <Label htmlFor="mobile" required>
                                        Mobile Number
                                    </Label>
                                    <Input
                                        type="tel"
                                        name="mobile"
                                        id="mobile"
                                        required
                                        placeholder="Enter mobile number"
                                        value={formData.mobile || ""}
                                        onChange={(e) => handleFormDataChange('mobile', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" required>
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email address"
                                        required
                                        value={formData.email || ""}
                                        onChange={(e) => handleFormDataChange('email', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    name="address"
                                    id="address"
                                    rows={4}
                                    placeholder="Enter complete address"
                                    value={formData.address || ""}
                                    onChange={(e) => handleFormDataChange('address', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="City"
                                        value={formData.city || ""}
                                        onChange={(e) => handleFormDataChange('city', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="State"
                                        value={formData.state || ""}
                                        onChange={(e) => handleFormDataChange('state', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder="Country"
                                        value={formData.country || ""}
                                        onChange={(e) => handleFormDataChange('country', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input
                                        type="text"
                                        name="pincode"
                                        id="pincode"
                                        placeholder="Pincode"
                                        value={formData.pincode || ""}
                                        onChange={(e) => handleFormDataChange('pincode', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <Label htmlFor="image">School Logo</Label>
                                    <div className="flex items-center gap-6 mt-2">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden">
                                            {logo ? (
                                                <img
                                                    src={URL.createObjectURL(logo)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={session?.image || "/school.png"}
                                                    alt="school logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Button
                                                onClick={handleUploadClick}
                                                type="button"
                                                icon="upload-2-line"
                                            >
                                                Upload Logo
                                            </Button>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Recommended size: 200x200px, PNG or JPG
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="website">Website URL</Label>
                                        <Input
                                            type="url"
                                            name="website"
                                            id="website"
                                            placeholder="https://www.yourschool.com"
                                            value={formData.website || ""}
                                            onChange={(e) => handleFormDataChange('website', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tagline">School Tagline</Label>
                                        <Input
                                            type="text"
                                            name="tagline"
                                            id="tagline"
                                            placeholder="Enter school tagline"
                                            value={formData.tagline || ""}
                                            onChange={(e) => handleFormDataChange('tagline', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end border-t border-gray-200 pt-6">
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <i className="ri-loader-4-line animate-spin mr-1"></i>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-save-line mr-1"></i>
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Settings;