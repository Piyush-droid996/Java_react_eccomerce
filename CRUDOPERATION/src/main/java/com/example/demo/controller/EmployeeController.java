package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Employee;
import com.example.demo.repo.EmployeeRepoCrudRepo;

@RestController
@RequestMapping("/code")
public class EmployeeController {
	@Autowired
	EmployeeRepoCrudRepo empCrud;
	@GetMapping
	public List<Employee> getAllEmployee()
	{
		System.out.println("getting all employee");
		return empCrud.findAll();
	}
	 @PostMapping
	    public Employee saveEmployee(@RequestBody Employee employee) {
	        return empCrud.save(employee);
	    }
	 @DeleteMapping("/{id}")
	 public String DeleteEmployee(@PathVariable Long id)
	 {
		 empCrud.deleteById(id);
		 
		 return "emp deleted";
	 }
	 @PutMapping("/{id}")
	 public String updateEmployee(@PathVariable Long id,
	                              @RequestBody Employee employee) {

	     System.out.println("Path id = " + id);
	     System.out.println("Body name = " + employee.getName());

	     Employee emp = empCrud.findById(id).orElse(null);
	     System.out.println("DB employee = " + emp);

	     if (emp == null) {
	         return "Employee not found";
	     }

	     emp.setName(employee.getName());
	     empCrud.save(emp);

	     return "Employee updated";
	 }

}
