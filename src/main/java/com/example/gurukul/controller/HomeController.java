/*   Created by IntelliJ IDEA.
 *   Author: Devvrat Sharma (devrats)
 *   Date: 13-Nov-21
 *   Time: 8:37 PM
 *   File: HomeController.java
 */

package com.example.gurukul.controller;


import com.example.gurukul.email.Email;
import com.example.gurukul.email.EmailService;
import com.example.gurukul.entity.*;
import com.example.gurukul.repository.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin
@Controller
@RestController
public class HomeController {


    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private ClassesRepository classesRepository;
    @Autowired
    private AnnouncementRepository announcementRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;

    @ResponseBody
    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody HashMap<String, Object> map) {
        String otp;
        Random rnd = new Random();
        EmailService emailService = new EmailService();
        if (map.get("role").equals("Teacher")) {
            Teacher teacher = new Teacher();
            teacher.setId((String) map.get("id"));
            teacher.setName((String) map.get("name"));
            teacher.setEmail((String) map.get("email"));
            teacherRepository.save(teacher);
            int number = rnd.nextInt(999999);
            otp = String.format("%06d", number);
            Email email = new Email();
            //emailService.sendEmail((String) map.get("email"), email.getHead2(), email.getMsg1(otp));
        } else {
            Student student = new Student();
            student.setId((String) map.get("id"));
            student.setName((String) map.get("name"));
            student.setEmail((String) map.get("email"));
            studentRepository.save(student);
            int number = rnd.nextInt(999999);
            otp = String.format("%06d", number);
            Email email = new Email();
            emailService.sendEmail((String) map.get("email"), email.getHead2(), email.getMsg1(otp));
        }
        return ResponseEntity.ok(Map.of("Status", "success","otp",otp));
    }

    @ResponseBody
    @RequestMapping(value = "/role", method = RequestMethod.POST)
    public ResponseEntity<?> role(@RequestBody HashMap<String, Object> map){
        Teacher teacherById = teacherRepository.findTeacherById((String) map.get("id"));
        if(teacherById!=null){
            return ResponseEntity.ok(Map.of("Role", "Teacher"));
        } else{
            return ResponseEntity.ok(Map.of("Role", "Student"));
        }
    }

    @ResponseBody
    @RequestMapping(value = "/createClass", method = RequestMethod.POST)
    public ResponseEntity<?> createClass(@RequestBody HashMap<String, Object> map) {
        Classes classes = new Classes();
        classes.setTitle((String) map.get("title"));
        classes.setTopic((String) map.get("topic"));
        classes.setMotto((String) map.get("motto"));
        Teacher teacher = teacherRepository.findTeacherById((String) map.get("id"));
        Random rnd = new Random();
        while (true) {
            int number = rnd.nextInt(999999);
            String secretCode = String.format("%06d", number);
            Classes classes1 = classesRepository.findClassesBySecretCode(Long.parseLong(secretCode));
            if (classes1 == null) {
                classes.setSecretCode(Long.parseLong(secretCode));
                break;
            }
        }
        classes.setTeacher(teacher);
        List<Classes> classes1 = teacher.getClasses();
        classes1.add(classes);
        teacher.setClasses(classes1);
        classesRepository.save(classes);
        teacherRepository.save(teacher);
        return ResponseEntity.ok(Map.of("SecretCode", classes.getSecretCode()));
    }

    @ResponseBody
    @RequestMapping(value = "/studentJoinClass", method = RequestMethod.POST)
    public ResponseEntity<?> studentJoinsClass(@RequestBody HashMap<String, Object> map) {
        boolean flag = false;
        Classes classes = classesRepository.findClassesBySecretCode(Long.parseLong(Integer.toString((Integer) map.get("secretCode"))));
        Student student = studentRepository.findStudentById((String) map.get("id"));
        List<Student> student1 = classes.getStudent();
        List<Classes> classes1 = student.getClasses();
        for (Classes classes2 : classes1) {
            if(classes2.equals(classes)){
                flag = true;
                break;
            }
        }
        if(flag){
            return ResponseEntity.ok(Map.of("Status", "Already in the class"));
        }
        classes1.add(classes);
        student1.add(student);
        classes.setStudent(student1);
        student.setClasses(classes1);
        classesRepository.save(classes);
        studentRepository.save(student);
        return ResponseEntity.ok(Map.of("Status", "success"));
    }

    @ResponseBody
    @RequestMapping(value = "/fetchAnnouncements", method = RequestMethod.POST)
    public ResponseEntity<?> fetchAnnouncements(@RequestBody HashMap<String, Object> map) {
        Classes classesBySecretCode = classesRepository.findClassesBySecretCode(Long.parseLong((String)
                map.get("secretCode")));
        List<Announcement> announcement = new ArrayList<>();
        announcement = classesBySecretCode.getAnnouncement();
        for (Announcement announcement1 : announcement) {
            announcement1.setComment(null);
        }
        return ResponseEntity.ok(Map.of("announcement", announcement));
    }

    @ResponseBody
    @RequestMapping(value = "/fetchAnnouncementsDetails", method = RequestMethod.POST)
    public ResponseEntity<?> fetchAnnouncementDetails(@RequestBody HashMap<String, Object> map) {
        Announcement announcement = announcementRepository.findAnnouncementById(Integer.parseInt((String)
                map.get("announcementId")));
        List<Comment> comment = announcement.getComment();
        for (Comment comment1 : comment) {
            if(comment1.getTeacher()==null){
                Student student = new Student();
                student.setName(comment1.getStudent().getName());
                student.setEmail(comment1.getStudent().getEmail());
                comment1.setStudent(student);
            } else{
                Teacher teacher = new Teacher();
                teacher.setName(comment1.getTeacher().getName());
                teacher.setEmail(comment1.getTeacher().getEmail());
                comment1.setTeacher(teacher);
            }

        }
        announcement.setComment(comment);
        Teacher teacher = teacherRepository.findTeacherById((String) map.get("uId"));
        if(announcement.getDueDate()==null){
            return ResponseEntity.ok(Map.of("announcement", announcement));
        }
        if (teacher != null) {
            List<Assignment> assignments = announcement.getAssignments();
            for (Assignment assignment : assignments) {
                assignment.setAnnouncement(null);
                Student student1 = new Student();
                student1.setName(assignment.getStudent().getName());
                student1.setEmail(assignment.getStudent().getEmail());
                assignment.setStudent(student1);
            }
            return ResponseEntity.ok(Map.of("announcement", announcement, "assignment", assignments));
        } else {
            Student student = studentRepository.findStudentById((String) map.get("uId"));
            Assignment assignment  = new Assignment();
            assignment = assignmentRepository.findAssignmentByAnnouncementAndStudent
                    (announcement, student);
            if(assignment==null){
                assignment = new Assignment();
                return ResponseEntity.ok(Map.of("announcement", announcement, "assignment", assignment));
            }
            assignment.setAnnouncement(null);
            Student student1 = new Student();
            student1.setName(assignment.getStudent().getName());
            student1.setEmail(assignment.getStudent().getEmail());
            assignment.setStudent(student1);
            return ResponseEntity.ok(Map.of("announcement", announcement, "assignment", assignment));
        }
    }

    @ResponseBody
    @RequestMapping(value = "/submitAnnouncements", method = RequestMethod.POST)
    public ResponseEntity<?> submitAnnouncement(@RequestBody HashMap<String, Object> map) {
        Student student = studentRepository.findStudentById((String) map.get("uId"));
        Announcement announcement = announcementRepository.findAnnouncementById(Integer.parseInt((String)
                map.get("announcementId")));
        Assignment assignment = new Assignment();
        List<Assignment> studentAssignments = student.getAssignments();
        List<Assignment> announcementAssignments = announcement.getAssignments();
        assignment.setStudent(student);
        assignment.setAnnouncement(announcement);
        assignment.setLink((String) map.get("downloadUrl"));
        studentAssignments.add(assignment);
        announcementAssignments.add(assignment);
        student.setAssignments(studentAssignments);
        announcement.setAssignments(announcementAssignments);
        assignmentRepository.save(assignment);
        studentRepository.save(student);
        announcementRepository.save(announcement);
        return ResponseEntity.ok(Map.of("Status", "success"));
    }

    @ResponseBody
    @RequestMapping(value = "/teacherGivesMArks", method = RequestMethod.POST)
    public ResponseEntity<?> teacherGivesMArks(@RequestBody HashMap<String, Object> map) {
        Assignment assignment = assignmentRepository.findAssignmentById(Integer.parseInt((String) map.get("assignmentId")));
        assignment.setMarks(Float.parseFloat((String) map.get("marks")));
        assignmentRepository.save(assignment);
        return ResponseEntity.ok(Map.of("Status", "success"));
    }
}