import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import StudentModel from "../models/student.model";
import TeacherModel from "../models/teacher.model";
import PaymentModel from "../models/payment.model";
import ClassModel from "../models/class.model";
import SchoolModel from "../models/school.model";

export const dashboard = async (req: Request, res: Response) => {
    try {
        const { schoolID, sessionID } = req.params;

        const [totalStudents, totalTeachers, totalPayments, totalClasses] = await Promise.all([
            StudentModel.countDocuments({ school: schoolID, session: sessionID }),
            TeacherModel.countDocuments({ school: schoolID, session: sessionID }),
            PaymentModel.aggregate([
                {
                    $match: {
                        school: schoolID,
                        session: sessionID
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalCollected: { $sum: "$amount" }
                    }
                }
            ]),
            ClassModel.countDocuments({ school: schoolID, session: sessionID })
        ]);

        res.json({
            totalStudents,
            totalTeachers,
            totalPayments: totalPayments[0]?.totalCollected || 0,
            totalClasses
        });

    } catch (err) {
        CatchError(err, res, "Failed to fetch dashboard record");
    }
};
