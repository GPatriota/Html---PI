import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      const adminUser: User = { username, password, isAdmin: true };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.currentUserSubject.next(adminUser);
      return true;
    }
    
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    
    return false;
  }

  register(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some(u => u.username === username)) {
      return false;
    }

    const newUser: User = { username, password, isAdmin: false };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}