import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PatientData } from '../types';
import { MedicalInput, MedicalSelect } from './FormElements';
import { Brain, Loader2, ClipboardList, MousePointer2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface PredictFormProps {
  onPredict: (data: PatientData) => void;
  isPredicting: boolean;
}

export const PredictForm = ({ onPredict, isPredicting }: PredictFormProps) => {
  const [formData, setFormData] = useState<Partial<PatientData>>({
    sex: "male",
    chestPainType: "asymptomatic",
    restingECG: "normal",
    exerciseAngina: false,
    fastingBS: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData as PatientData);
  };

  const updateField = (key: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const loadSample = () => {
    setFormData({
      name: "John Doe (High Risk)",
      age: 58,
      sex: "male",
      chestPainType: "asymptomatic",
      restingBP: 140,
      cholesterol: 289,
      fastingBS: false,
      restingECG: "LVH",
      maxHR: 172,
      exerciseAngina: true,
      oldpeak: 2.8
    });
  };

  const loadHealthySample = () => {
    setFormData({
      name: "Jane Smith (Low Risk)",
      age: 32,
      sex: "female",
      chestPainType: "non-anginal",
      restingBP: 115,
      cholesterol: 175,
      fastingBS: false,
      restingECG: "Normal",
      maxHR: 185,
      exerciseAngina: false,
      oldpeak: 0.0
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-outline-variant rounded-medical-lg shadow-sm overflow-hidden"
    >
      <div className="p-8 border-b border-outline-variant flex items-center justify-between">
        <div>
          <h2 className="headline-md mb-1 text-on-surface">Patient Biometrics</h2>
          <p className="body-sm text-outline">Input clinical biomarkers for diagnostic estimation.</p>
        </div>
        <div className="flex gap-2 text-[9px]">
          <button 
            type="button"
            onClick={loadHealthySample}
            className="flex items-center gap-2 px-3 py-1.5 rounded-medical border border-outline-variant label-caps hover:bg-surface-container transition-colors"
          >
            <ClipboardList className="w-3 h-3" />
            Healthy Case
          </button>
          <button 
            type="button"
            onClick={loadSample}
            className="flex items-center gap-2 px-3 py-1.5 rounded-medical border border-outline-variant label-caps hover:bg-surface-container transition-colors"
          >
            <ClipboardList className="w-3 h-3" />
            High Risk Case
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div className="md:col-span-2 lg:col-span-3">
            <MedicalInput 
              label="Patient Name" 
              type="text" 
              placeholder="Full Name"
              value={formData.name || ''}
              onChange={e => updateField('name', e.target.value)}
              required
            />
          </div>

          <MedicalInput 
            label="Age" 
            unit="years" 
            type="number" 
            placeholder="e.g. 52"
            value={formData.age || ''}
            onChange={e => updateField('age', Number(e.target.value))}
            required
          />
          
          <MedicalSelect 
            label="Sex"
            value={formData.sex}
            onChange={(e: any) => updateField('sex', e.target.value)}
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]}
          />

          <MedicalSelect 
            label="Chest Pain Type"
            value={formData.chestPainType}
            onChange={(e: any) => updateField('chestPainType', e.target.value)}
            options={[
              { label: 'Asymptomatic', value: 'asymptomatic' },
              { label: 'Non-Anginal', value: 'non-anginal' },
              { label: 'Atypical Angina', value: 'atypical' },
              { label: 'Typical Angina', value: 'typical' }
            ]}
          />

          <MedicalInput 
            label="Resting BP" 
            unit="mm Hg" 
            type="number" 
            placeholder="e.g. 120"
            value={formData.restingBP || ''}
            onChange={e => updateField('restingBP', Number(e.target.value))}
            required
          />

          <MedicalInput 
            label="Cholesterol" 
            unit="mg/dl" 
            type="number" 
            placeholder="e.g. 230"
            value={formData.cholesterol || ''}
            onChange={e => updateField('cholesterol', Number(e.target.value))}
            required
          />

          <MedicalInput 
            label="Max Heart Rate" 
            unit="bpm" 
            type="number" 
            placeholder="e.g. 150"
            value={formData.maxHR || ''}
            onChange={e => updateField('maxHR', Number(e.target.value))}
            required
          />

          <MedicalInput 
            label="ST Depression (Oldpeak)" 
            unit="mm" 
            type="number" 
            step="0.1"
            placeholder="e.g. 1.5"
            value={formData.oldpeak || ''}
            onChange={e => updateField('oldpeak', Number(e.target.value))}
            required
          />

          <MedicalSelect 
            label="Exercise Angina"
            value={formData.exerciseAngina ? 'true' : 'false'}
            onChange={(e: any) => updateField('exerciseAngina', e.target.value === 'true')}
            options={[
              { label: 'No', value: 'false' },
              { label: 'Yes', value: 'true' }
            ]}
          />

          <MedicalSelect 
            label="Resting ECG"
            value={formData.restingECG}
            onChange={(e: any) => updateField('restingECG', e.target.value)}
            options={[
              { label: 'Normal', value: 'normal' },
              { label: 'ST Wave Abnormality', value: 'ST' },
              { label: 'Left Ventricular Hypertrophy', value: 'LVH' }
            ]}
          />
        </div>

        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled={isPredicting}
            className={cn(
              "px-8 py-4 bg-primary-clinical text-white rounded-medical flex items-center gap-3 transition-all",
              "hover:bg-primary-container-clinical hover:shadow-lg active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isPredicting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
            <span className="font-bold tracking-wide uppercase text-sm">Run Clinical Diagnostics</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};
